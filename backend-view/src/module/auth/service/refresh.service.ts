import pool from "../../../db/db.js";
import jwt from "jsonwebtoken";

export const refreshService = async (
  refreshToken: string
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE refresh_token = $1
    `,
    [refreshToken]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid Refresh Token");
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string
  );

  const access_token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15m",
    }
  );

  const refresh_token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "20m",
    }
  );

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
  };
};