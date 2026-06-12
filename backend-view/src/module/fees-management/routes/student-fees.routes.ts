import express, { Router } from "express";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import {
  createStudentFees,
  deleteStudentFees,
  getStudentFees,
  getStudentFeesById,
  updateStudentFees,
} from "../controllers/student-fees.controller.js";

const router = express.Router();

router.post("/create", authMiddleware,createStudentFees);
router.get("/", authMiddleware,getStudentFees);
router.get("/:id", authMiddleware,getStudentFeesById);
router.delete("/:id", authMiddleware,deleteStudentFees);
router.put("/:id", authMiddleware,updateStudentFees);

export default router;
