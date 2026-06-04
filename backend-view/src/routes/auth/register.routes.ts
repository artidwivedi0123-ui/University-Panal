import express from "express";
import { registerUser } from "../../controller/auth/register.controller.js";

const router  = express.Router();

router.post('/create',registerUser);


export default router;