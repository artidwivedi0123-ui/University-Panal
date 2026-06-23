import express from "express";
import { registerUser } from "@src/module/auth/controller/register.controller.js";

const router  = express.Router();

router.post('/register',registerUser);


export default router;