import express from "express";
import {
  createCourse,
  getCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
} from "@src/module/universityPanel/controllers/course.controllers.js";
import { authMiddleware } from "@src/module/auth/middleware/auth.middleware.js";
import { roleMiddleware } from "@src/module/auth/middleware/role.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware("admin"), createCourse);
router.get("/", authMiddleware, getCourse);
router.delete("/:id",authMiddleware, roleMiddleware("admin"),deleteCourse);
router.put("/:id",authMiddleware,roleMiddleware("admin"),updateCourse);
router.get("/:id", getCourseById);

export default router;
