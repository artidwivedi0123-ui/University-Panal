import { Request, Response } from "express";
import { registerService } from "../service/register.service.js";
import { Register } from "../model/register.model.js";
import { validateRegister } from "../validation/register.validation.js";
import pool from "../../../db/db.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const register: Register = req.body;
    const registerError = validateRegister(register);

    if (registerError) {
      return res.status(400).json({
        success: false,
        message: registerError,
      });
    }


     const exixtingUser = await pool.query(
    `
        SELECT * FROM users 
        WHERE email = $1
        `,
    [register.email],
  );
  if(exixtingUser.rows.length > 0) {
    res.status(400).json({
      success:false,
      messages:"This user is already exist with the same email id",
    })
  }

    const user = await registerService(register);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in the user Registration",
    });
  }
};
