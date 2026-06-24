import { Router } from "express";

import loginRoutes from "@src/module/auth/routes/login.routes.js";
import registerRoutes from "@src/module/auth/routes/register.routes.js";
import logoutRoutes from "@src/module/auth/routes/logout.routes.js";
import refreshRoutes from "@src/module/auth/routes/refresh.routes.js";
import forgotPasswordRoutes from "@src/module/auth/routes/forget-password.routes.js";
import resetPasswordRoutes from "@src/module/auth/routes/reset-password.routes.js";

const router = Router();

router.use(loginRoutes);
router.use(registerRoutes);
router.use(logoutRoutes);
router.use(refreshRoutes);
router.use(forgotPasswordRoutes);
router.use(resetPasswordRoutes);

export default router;