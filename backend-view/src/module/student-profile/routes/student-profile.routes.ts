import express from "express";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import { roleMiddleware } from "../../auth/middleware/role.middleware.js";
import { getStudentProfile } from "../controllers/student-profile.controller.js";
const router  =  express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("student"),
  getStudentProfile
);

export default router;