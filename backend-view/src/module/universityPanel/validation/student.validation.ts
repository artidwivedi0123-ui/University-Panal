import { Student } from "@src/module/universityPanel/models/student.model.js";


export const validateStudent = (data: Student) => {
  const {
    name,
    roll_number,
    gender,
    course_id,
    semester_id,
    marks,
    grade_points,
    result,
  } = data;

  switch (true) {
    case !course_id:
      return "Course Id is required";

    case !semester_id:
      return "Semester Id is required";

    case !name?.trim():
      return "Student Name is required";

    case !roll_number?.trim():
      return "Roll Number is required";

    case !gender:
      return "Gender is required";

    case !["M", "F"].includes(gender):
      return "Gender must be M or F";

    case !result:
      return "Result is required";

    case !["Pass", "Fail"].includes(result):
      return "Result must be Pass or Fail";

    case marks === undefined || marks === null:
      return "Marks are required";

    case marks < 0 || marks > 100:
      return "Marks must be between 0 and 100";

    case grade_points === undefined || grade_points === null:
      return "Grade Points are required";

    case grade_points < 0 || grade_points > 10:
      return "Grade Points must be between 0 and 10";

    default:
      return null;
  }
};
