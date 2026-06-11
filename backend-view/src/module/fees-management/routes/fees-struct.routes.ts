import express from "express";
import {
  createFeeStructure,
  getFeeStructure,
  updateFeesStructure,
  deleteFeeStructure,
  getFeeStructureById,
  getFeeStructureDashboard,
} from "../controllers/fees-struct.controller.js";

const router = express.Router();

router.post("/create", createFeeStructure);
router.get("/", getFeeStructure);
router.put("/:id", updateFeesStructure);
router.delete("/:id", deleteFeeStructure);
router.get("/fee-dashboard", getFeeStructureDashboard);
router.get("/:id", getFeeStructureById);

export default router;
