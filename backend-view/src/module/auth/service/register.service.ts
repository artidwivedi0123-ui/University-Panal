import pool from "../../../db/db.js";
import bcrypt from "bcryptjs";
import { Register } from "../model/register.model.js";

export const registerService = async (register: Register) => {
  const exixtingUser = await pool.query(
    `
        SELECT * FROM users 
        WHERE email = $1
        `,
    [register.email],
  );

  if (exixtingUser.rows.length > 0) {
    throw new Error("Email already Exist");
  }

  const hashedPassword = await bcrypt.hash(register.password, 10);

  const result = await pool.query(
    `   INSERT INTO users
            (full_name,email,password,role) 
            VALUES 
            ($1,$2,$3,$4)
            RETURNING id,full_name,email,role
        `,
    [register.full_name, register.email, hashedPassword, register.role || "student"],
  );

  return result.rows[0];
};
