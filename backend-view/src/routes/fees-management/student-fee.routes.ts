import express, { Router } from 'express';
import { createStudentFees, deleteStudentFees, getStudentFees, getStudentFeesById, updateStudentFees } from '../../controller/fees-management/student-fee.controller.js';

const router  = express.Router();


router.post("/create",createStudentFees);
router.get("/",getStudentFees);
router.get("/:id",getStudentFeesById);
router.delete("/:id",deleteStudentFees);
router.put("/:id",updateStudentFees);


export default router;