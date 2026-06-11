import { Semester } from "../models/semester.model.js";

export const validateSemesterInput = (semester: Semester) => {
  switch (true) {
    case !semester.semester_number || !semester.course_id:
      return "Semester Number  and Course Id must be required";

    case semester.semester_number < 1 || semester.semester_number > 8:
      return "Semester Number must be greater than 0 and smaller  than 8 ";

    default:
      return null;
  }
};