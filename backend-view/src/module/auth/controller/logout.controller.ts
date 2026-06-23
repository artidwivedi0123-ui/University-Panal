import { Response } from "express";
import { logoutService } from "@src/module/auth/service/logout.service.js";
import { AuthRequest } from "@src/module/auth/model/auth-req.model.js";

export const logout = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await logoutService(userId);
    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Logout Failed",
    });

  }
};