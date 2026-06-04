import  express from "express";
import { loginUser } from "../../controller/auth/login.controller.js";

const router = express.Router();

router.post('/create',loginUser);

export  default router;