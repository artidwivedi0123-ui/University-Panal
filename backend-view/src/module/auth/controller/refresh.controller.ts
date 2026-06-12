import { Request, Response } from "express";
import { refreshService } from "../service/refresh.service.js";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        message: "Refresh Token is Required",
      });
    }

    const result = await refreshService(refresh_token);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error in Refresh Token",
    });
  }
};
