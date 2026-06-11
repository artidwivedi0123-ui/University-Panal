import { FeesStructure } from "../models/fees-struct.model.js";

export const validateFees = (fees: FeesStructure): string | null => {
  const {
    course_id,
    semester_id,
    tuition_fee,
    exam_fee,
    library_fee,
    other_fee,
  } = fees;

  switch (true) {
    case !course_id:
      return "Course Id is required";

    case !semester_id:
      return "Semester Id is required";

    case isNaN(Number(course_id)):
      return "Course Id must be a valid number";

    case isNaN(Number(semester_id)):
      return "Semester Id must be a valid number";

    case tuition_fee === undefined:
      return "Tuition Fee is required";

    case exam_fee === undefined:
      return "Exam Fee is required";

    case library_fee === undefined:
      return "Library Fee is required";

    case other_fee === undefined:
      return "Other Fee is required";

    case tuition_fee < 0:
      return "Tuition Fee cannot be negative";

    case exam_fee < 0:
      return "Exam Fee cannot be negative";

    case library_fee < 0:
      return "Library Fee cannot be negative";

    case other_fee < 0:
      return "Other Fee cannot be negative";

    default:
      return null;
  }
};