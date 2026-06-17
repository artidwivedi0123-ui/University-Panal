import pool from "../../../db/db.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../../utils/token.js";

export const refreshService = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;
    const userId = decoded.id;
    console.log("userId",userId);
    const result = await pool.query(
      `
      SELECT id, role, refresh_token
      FROM users
      WHERE id = $1
      `,
      [userId],
    );
    const user = result.rows[0];
    if (!user) {
      throw new Error("User not found");
    }

    if (user.refresh_token !== refreshToken) {
      throw new Error("Invalid Refresh Token");
    }
    const access_token = generateAccessToken(user?.id, user?.role);
    const new_refresh_token = generateRefreshToken(user?.id,user?.role);
    await pool.query(
      `
      UPDATE users
      SET refresh_token = $1
      WHERE id = $2
      `,
      [new_refresh_token, user.id],
    );

    return {
      access_token,
      refresh_token: new_refresh_token,
    };
  } catch (error) {
    throw new Error("Refresh Token Expired or Invalid");
  }
};
