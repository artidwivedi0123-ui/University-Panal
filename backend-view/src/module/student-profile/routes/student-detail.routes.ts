import express from "express";
import {
  createStudentsDetails,
  deleteStudentDetails,
  getStudentDetailsById,
  getStudentsDetails,
  updateStudentDetails,
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
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getStudentDetailsById,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteStudentDetails,
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateStudentDetails,
);

export default router;
