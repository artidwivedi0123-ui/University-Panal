import { ConfigURL } from "@src/config/config.js";
import jwt from "jsonwebtoken";
export const generateAccessToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, ConfigURL.jwt_screct, {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, ConfigURL.jwt_refresh_secret, {
    expiresIn: "7d",
  });
};




