import express from "express";
import {
  createSemester,
  getSemester,
  getSemesterById,
  updateSemester,
  deleteSemester,
} from "../controllers/semester.controllers.js";
const router = express.Router();

router.post("/create", createSemester);
router.get("/", getSemester);
router.delete("/:id", deleteSemester);
router.put("/:id", updateSemester);
router.get("/:id", getSemesterById);

export default router;
