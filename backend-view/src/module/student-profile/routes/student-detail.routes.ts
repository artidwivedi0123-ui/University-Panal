import express from "express";
import {
  createStudentsDetails,
  getStudentsDetails,
} from "../controllers/student-detail.controller.js";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import { roleMiddleware } from "../../auth/middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createStudentsDetails,
);

router.get("/", authMiddleware, getStudentsDetails);

export default router;
