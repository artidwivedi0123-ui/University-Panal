import express  from  "express";
import { logout } from "../controller/logout.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router  = express.Router();

router.post("/logout",authMiddleware,logout);


export default router;