import { Router } from "express";
import studentProfileRoute from "@src/module/student-profile/routes/student-profile.routes.js";
import studentDetailingRoutes from "@src/module/student-profile/routes/student-detail.routes.js";
const router = Router();

router.use("/stud", studentProfileRoute);
router.use("/stud-detail", studentDetailingRoutes);

export default router;