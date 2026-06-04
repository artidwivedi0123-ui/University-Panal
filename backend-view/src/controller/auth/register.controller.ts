import { Request, Response } from "express";
import { registerService } from "../../services/auth/register.service.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password, role } = req.body;

    const user = await registerService(full_name, email, password, "student");
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
