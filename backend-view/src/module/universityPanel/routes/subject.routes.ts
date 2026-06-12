import express from "express";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import {
  createSubjects,
  getSubjectById,
  getSubjectDashboard,
  getSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controllers.js";
import { roleMiddleware } from "../../auth/middleware/role.middleware.js";

const router = express.Router();

router.post("/create",authMiddleware,roleMiddleware("admin"),createSubjects);
router.get("/", authMiddleware,getSubjects);
router.get("/:id", authMiddleware,getSubjectById);
router.delete("/:id", authMiddleware,roleMiddleware("admin"),deleteSubject);
router.put("/:id", authMiddleware,roleMiddleware("admin"),updateSubject);
router.get("/subject/dashboard", authMiddleware,getSubjectDashboard);
export default router;
