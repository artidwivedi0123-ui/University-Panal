import express  from 'express';
import { createSemester, deleteSemester, getSemester, getSemesterById, updateSemester } from '../../controller/university/semester.controller.js';


const router  = express.Router();

router.post("/create",createSemester);
router.get("/",getSemester);
router.delete("/:id",deleteSemester);
router.put("/:id",updateSemester);
router.get("/:id",getSemesterById);

export default router;