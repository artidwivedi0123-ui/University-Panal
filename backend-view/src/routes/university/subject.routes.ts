import express from 'express';
import { createSubjects, deleteSubject, getSubjectById, getSubjectDashboard, getSubjects, updateSubject } from '../../controller/university/subject.controller.js';

const router = express.Router();

router.post('/create',createSubjects);
router.get("/",getSubjects);
router.get("/:id",getSubjectById);
router.delete("/:id",deleteSubject);
router.put("/:id",updateSubject);
router.get("/subject/dashboard",getSubjectDashboard);
export default router;