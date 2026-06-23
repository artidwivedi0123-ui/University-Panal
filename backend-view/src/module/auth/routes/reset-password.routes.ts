import express from "express";

import {
  resetPassword,
} from "@src/module/auth/controller/reset-password.controller.js";

const router = express.Router();

router.post(
  "/reset-password/:token",
  resetPassword
);

export default router;