import { Router } from "express";
import feesStructureRoutes from "@src/module/fees-management/routes/fees-struct.routes.js";
import studentFeesRoutes from "@src/module/fees-management/routes/student-fees.routes.js";
const router = Router();

router.use("/fee-structure", feesStructureRoutes);
router.use("/student-fees", studentFeesRoutes);

export default router;