import express from "express";
import { createStudents, deleteStudent, getstudentById, getStudentDashboard, getStudents, updateStudent } from "../../controller/university/student.controller.js";

const router = express.Router();

router.post("/create",createStudents);
router.get("/",getStudents);
router.get("/:id",getstudentById);
router.put("/:id",updateStudent);
router.delete("/:id",deleteStudent);
router.get("/student/dashboard",getStudentDashboard);


export default router;