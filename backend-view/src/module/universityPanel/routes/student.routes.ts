import express from "express";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import {
  createStudents,
  getStudents,
  getstudentById,
  getStudentDashboard,
  updateStudent,
  deleteStudent,
  getAllStudents,
} from "../controllers/student.controllers.js";
import { roleMiddleware } from "../../auth/middleware/role.middleware.js";
const router = express.Router();

router.post("/create",authMiddleware,roleMiddleware("admin"),createStudents);
router.get("/", authMiddleware,getStudents);
router.get("/all",authMiddleware,getAllStudents);
router.get("/:id",authMiddleware ,getstudentById);
router.put("/:id", authMiddleware,roleMiddleware("admin"),updateStudent);
router.delete("/:id", authMiddleware,roleMiddleware("admin"),deleteStudent);
router.get("/student/dashboard", authMiddleware,getStudentDashboard);

export default router;
