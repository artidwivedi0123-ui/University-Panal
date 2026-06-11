import express from "express";
import {
  createCourse,
  getCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
} from "../controllers/course.controllers.js";

const router = express.Router();

router.post("/create", createCourse);
router.get("/", getCourse);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);
router.get("/:id", getCourseById);

export default router;
