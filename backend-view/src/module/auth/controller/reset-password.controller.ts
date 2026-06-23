import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import pool from "@src/db/db.js";
import jwt, { JwtPayload } from "jsonwebtoken";



export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const    {token }  = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE id = $2
      RETURNING id
      `,
      [hashedPassword, decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};