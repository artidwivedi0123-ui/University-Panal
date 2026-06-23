import express from "express";
import { refreshToken } from "@src/module/auth/controller/refresh.controller.js";

const router  =  express.Router();

router.post("/refresh",refreshToken);

export   default router;