import { Subject } from "@src/module/universityPanel/models/subject.model.js";

export const validateSubject = (data: Subject) => {
  const { subject_name, subject_code, credits, semester_id, course_name } =
    data;

  switch (true) {
    case !subject_name:
      return "Subject name is required";

    case !subject_code:
      return "Subject Code is required";

    case !semester_id:
      return "Semester Id is required for subject";

    case !course_name:
      return "Course Id is  required for subject";

    case !credits:
      return "Subject Credits is Required";

    case credits < 4 || credits > 12:
      return "Subject credits must lie between 4 and 12";
  }
};
