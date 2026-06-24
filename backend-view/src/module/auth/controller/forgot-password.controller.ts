import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "@src/db/db.js";
import { sendMail } from "@src/utils/send.mail.js";
import { resetPasswordTemplate } from "@src/module/auth/templetes/reset-password.templete.js";
import { ForgotPassword } from "@src/module/universityPanel/models/forgot-password.model.js";
import { validateForget } from "../validation/forgot-password.validation.js";
import { ConfigURL } from "@src/config/config.js";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const forPass: ForgotPassword = req.body;
    const validateError = validateForget(forPass);
    if (validateError) {
      return res.status(400).json({
        success: false,
        message: validateError,
      });
    }

    const userResult = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [forPass.email],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("Result User",userResult);
    const user = userResult.rows[0];
    const token = jwt.sign(
      {
        id: user.id,
        type: "reset-password",
      },
      ConfigURL.jwt_screct,
      {
        expiresIn: "15m",
      },
    );

    const resetLink = `${process.env.FRONTENDURL}/reset-password/${token}`;
    await sendMail(
      user.email,
      "Reset Password",
      resetPasswordTemplate(user.full_name, resetLink),
    );

    return res.status(200).json({
      success: true,
      message: "Reset link sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error sending reset email",
    });
  }
};
