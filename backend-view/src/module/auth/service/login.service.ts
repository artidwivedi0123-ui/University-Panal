import pool from "@src/db/db.js";
import bcrypt from "bcryptjs";

import { Login } from "@src/module/auth/model/login.model.js";
import { generateAccessToken, generateRefreshToken } from "@src/utils/token.js";

export const loginService = async (login: Login) => {
  const result = await pool.query(
    `
    SELECT
      id,
      full_name,
      email,
      password,
      role
    FROM users
    WHERE email = $1
    `,
    [login.email]
  );

  const user = result.rows[0];
  if (!user) {
    throw new Error("Invalid Email or Password");
  }
  const isPasswordValid = await bcrypt.compare(
    login.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid Email or Password");
  }

  const access_token = generateAccessToken(user?.id,user?.role);
  const refresh_token = generateRefreshToken(user?.id,user?.role);
  await pool.query(
    `
    UPDATE users
    SET refresh_token = $1
    WHERE id = $2
    `,
    [refresh_token, user.id]
  );

  return {
    access_token,
    refresh_token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
  };
};