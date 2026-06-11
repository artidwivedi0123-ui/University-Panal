import express from "express";
import {
  createStudents,
  getStudents,
  getstudentById,
  getStudentDashboard,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controllers.js";
const router = express.Router();

router.post("/create", createStudents);
router.get("/", getStudents);
router.get("/:id", getstudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/student/dashboard", getStudentDashboard);

export default router;
