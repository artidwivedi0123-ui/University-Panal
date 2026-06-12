import { Request,Response } from "express";
import { Login } from "../model/login.model.js";
import { validateLogin } from "../validation/login.validation.js";
import { loginService } from "../service/login.service.js";
import { AuthRequest } from "../model/auth-req.model.js";

export const loginUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const login : Login = req.body;

    const error = validateLogin(login);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const result = await  loginService(login);

    res.status(200).json({
      success: true,
      data: result,
      message: "User Logged in Successfully",
    });

  } catch (error: any) {

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};