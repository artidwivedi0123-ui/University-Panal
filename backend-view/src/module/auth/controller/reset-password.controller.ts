import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import pool from "@src/db/db.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResetPassword } from "@src/module/universityPanel/models/reset-password.model.js";
import { validateResetPassword } from "../validation/reset-password.validation.js";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const resetpass: ResetPassword = req.body;

    const validateError = validateResetPassword(resetpass);

    if(!token) {
      return  res.status(400).json({
        success:false,
        message:"Invalid Token",
      })
    }

    if (validateError) {
      return res.status(400).json({
        success: false,
        message: validateError,
      });
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    const hashedPassword = await bcrypt.hash(resetpass.new_password, 10);
    const result = await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE id = $2
      RETURNING id
      `,
      [hashedPassword, decoded.id],
    );


    
    if (!decoded.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token Payload",
      });
    }

    if(result.rows.length === 0) {
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid Token and Expired",
    });
  }
};
