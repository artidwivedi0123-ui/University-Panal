import express from "express";
import { loginUser } from "@src/module/auth/controller/login.controller.js";

const router  = express.Router();

router.post('/login',loginUser);


export default router;