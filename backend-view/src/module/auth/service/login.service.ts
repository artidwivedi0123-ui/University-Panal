import pool from "../../../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Login } from "../model/login.model.js";

export const loginService = async (login: Login) => {
  const result = await pool.query(
    `
        SELECT * FROM users  WHERE email = $1
        `,
    [login.email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(login.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Password");
  }
  const access_token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10m",
    },
  );

  const refresh_token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "15m",
    },
  );

  await pool.query(
    `
    UPDATE users 
    SET refresh_token = $1
    where id = $2
    `,
    [refresh_token, user.id],
  );

  return {
    access_token,
    refresh_token,
    user: {
      id: user.id,
      full_name: user.full_name,
      role: user.role,
      email: user.email,
    },
  };
};
