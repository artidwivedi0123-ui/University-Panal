import { Router } from "express";

import courseRoutes from "./course.routes.js";
import semesterRoutes from "./semester.routes.js";
import subjectRoutes from "./subject.routes.js";
import studentRoutes from "./student.routes.js";

const router = Router();

router.use("/course", courseRoutes);
router.use("/semester", semesterRoutes);
router.use("/subject", subjectRoutes);
router.use("/student", studentRoutes);

export default router;