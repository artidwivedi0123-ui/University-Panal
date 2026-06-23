import pool from "@src/db/db.js";
import bcrypt from "bcryptjs";
import { Register } from "@src/module/auth/model/register.model.js";

export const registerService = async (
  register: Register
) => {

  const hashedPassword = await bcrypt.hash(
    register.password,
    10
  );

  const userResult = await pool.query(
    `
    INSERT INTO users
    (
      full_name,
      email,
      password,
      role
    )
    VALUES ($1,$2,$3,$4)
    RETURNING id,full_name,email,role
    `,
    [
      register.full_name,
      register.email,
      hashedPassword,
      register.role || "student"
    ]
  );

  return userResult.rows[0];
};