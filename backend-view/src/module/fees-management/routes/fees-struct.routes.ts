import express from "express";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import {
  createFeeStructure,
  getFeeStructure,
  updateFeesStructure,
  deleteFeeStructure,
  getFeeStructureById,
  getFeeStructureDashboard,
} from "../controllers/fees-struct.controller.js";

const router = express.Router();

router.post("/create",authMiddleware,createFeeStructure);
router.get("/",authMiddleware, getFeeStructure);
router.put("/:id", authMiddleware,updateFeesStructure);
router.delete("/:id", authMiddleware,deleteFeeStructure);
router.get("/fee-dashboard", authMiddleware,getFeeStructureDashboard);
router.get("/:id", authMiddleware,getFeeStructureById);

export default router;
