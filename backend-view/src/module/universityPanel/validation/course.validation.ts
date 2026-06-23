import { Course } from "@src/module/universityPanel/models/course.model.js";

export const validateCourse = (
  course: Partial<Course>
): string | null => {

  switch (true) {
    case !course.course_name?.trim():
      return "Course Name is required";

    case !course.course_type?.trim():
      return "Course Type is required";

    case !["UG", "PG"].includes(course?.course_type ?? ""):
      return "Course Type must be UG or PG";

    default:
      return null;
  }
};