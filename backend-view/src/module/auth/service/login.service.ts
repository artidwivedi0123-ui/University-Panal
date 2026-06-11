import pool from "../../../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Login } from "../model/login.model.js";

export const loginService = async (login:Login)=> {
  
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

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      role: user.role,
      email:user.email,
    },
  };
};
