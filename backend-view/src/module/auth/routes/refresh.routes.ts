import express from "express";
import { refreshToken } from "../controller/refresh.controller.js";

const router  =  express.Router();

router.post("/refresh",refreshToken);

export   default router;