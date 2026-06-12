import express from "express";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import {
  createSemester,
  getSemester,
  getSemesterById,
  updateSemester,
  deleteSemester,
} from "../controllers/semester.controllers.js";
import { roleMiddleware } from "../../auth/middleware/role.middleware.js";
const router = express.Router();

router.post("/create", authMiddleware,roleMiddleware("admin"),createSemester);
router.get("/",authMiddleware ,getSemester);
router.delete("/:id",authMiddleware,roleMiddleware("admin"),deleteSemester);
router.put("/:id", authMiddleware,roleMiddleware("admin"),updateSemester);
router.get("/:id",authMiddleware ,getSemesterById);

export default router;
