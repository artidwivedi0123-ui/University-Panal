import { Subject } from "../models/subject.model.js";

export const validateSubject = (data: Subject) => {
  const { subject_name, subject_code, credits, semester_id, course_id } = data;

  switch (true) {
    case !subject_name:
      return "Subject name is required";

    case !subject_code:
      return "Subject Code is required";

    case !semester_id:
      return "Semester Id is required for subject";

    case !course_id:
      return "Course Id is  required for subject";

    case !credits:
      return "Subject Credits is Required";

    case credits > 2 || credits < 12:
      return "Subject credits must be  lie between 4 and 12";
  }
};
