import { Request, Response } from "express";
import { registerService } from "@src/module/auth/service/register.service.js";
import { Register } from "@src/module/auth/model/register.model.js";
import { validateRegister } from "@src/module/auth/validation/register.validation.js";
import pool from "@src/db/db.js";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const register: Register = req.body;

    const registerError =
      validateRegister(register);

    if (registerError) {
      return res.status(400).json({
        success: false,
        message: registerError,
      });
    }

    const existingUser =
      await pool.query(
        `
        SELECT id
        FROM users
        WHERE email = $1
        `,
        [register.email]
      );

    if (
      existingUser.rows.length > 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with this email",
      });
    }

    const user =
      await registerService(register);

    res.status(201).json({
      success: true,
      message:
        "User Registered Successfully",
      data: user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Error in User Registration",
    });
  }
};