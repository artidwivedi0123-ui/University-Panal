import express from "express";

import {
  forgotPassword,
} from "@src/module/auth/controller/forgot-password.controller.js";

const router = express.Router();

router.post(
  "/forgot-password",
  forgotPassword
);


export default router;