import express from "express";
import {
  createCourse,
  getCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
} from "../controllers/course.controllers.js";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import { roleMiddleware } from "../../auth/middleware/role.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware("admin"), createCourse);
router.get("/", authMiddleware, getCourse);
router.delete("/:id",authMiddleware, roleMiddleware("admin"),deleteCourse);
router.put("/:id",authMiddleware,roleMiddleware("admin"),updateCourse);
router.get("/:id", getCourseById);

export default router;
