import { Request, Response } from "express";
import { loginService } from "../../services/auth/login.service.js";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(201).json({
      success: true,
      data: result,
      message: "User Logged in Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error in Logged  in User",
    });
  }
};
