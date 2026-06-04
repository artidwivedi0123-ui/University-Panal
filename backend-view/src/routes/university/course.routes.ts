import express from "express";
import { createCourse, deleteCourse, getCourse, getCourseById, updateCourse } from "../../controller/university/course.controller.js";

const router  = express.Router();

router.post('/create',createCourse);
router.get("/",getCourse);
router.delete('/:id',deleteCourse);
router.put('/:id',updateCourse);
router.get("/:id",getCourseById)


export default router;