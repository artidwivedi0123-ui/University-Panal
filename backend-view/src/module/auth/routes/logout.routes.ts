import express  from  "express";
import { logout } from "@src/module/auth/controller/logout.controller.js";
import { authMiddleware } from "@src/module/auth/middleware/auth.middleware.js";

const router  = express.Router();

router.post("/logout",authMiddleware,logout);


export default router;