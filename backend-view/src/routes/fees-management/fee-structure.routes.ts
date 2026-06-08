import express from "express";
import { createFeeStructure, deleteFeeStructure, getFeeStructure, getFeeStructureById, updateFeesStructure } from "../../controller/fees-management/fee-structure.controller.js";

const router =  express.Router();


router.post("/create",createFeeStructure);
router.get("/",getFeeStructure);
router.put("/:id",updateFeesStructure);
router.delete("/:id",deleteFeeStructure);
router.get("/:id",getFeeStructureById);


export default router;