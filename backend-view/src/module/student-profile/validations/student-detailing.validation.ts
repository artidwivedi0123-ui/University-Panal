import { StudentDetailing } from "../model/student-detail.model.js";

export const validateStudentDetailing = (data: StudentDetailing) => {
  const {
    address,
    city,
    country,
    date_of_birth,
    email,
    father_name,
    full_name,
    mother_name,
    phone_number,
    previous_college,
    previous_school,
    previous_study_field,
    state,
    student_id,
  } = data;

  switch (true) {
    case !student_id:
      return "Student Id is Required";

    case !full_name:
      return "Student Name is Required";


    case !email:
  return "Email is Required";

    case !father_name || !mother_name:
      return "Student's Parent Name is Required";

    case !phone_number:
      return "Student Contact Details must be Required";

    case !city || !state || !country || !address:
      return "Student's Address must be Required";

    case !previous_school:
      return "Students Previous Education Details must be required";

    case !date_of_birth:
      return "Student Date of Birth is required";

    case !previous_study_field:
      return "Student Previous Study Field is Required";
  }
};
