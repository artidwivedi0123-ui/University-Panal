export const UNIVERSITY_SECTION_TYPE = {
  COURSE: "course",
  COURSES: "courses",
  SEMESTERS: "semesters",
  STUDENTS: "students",
  SUBJECTS: "subjects",
  FEESTRUCTURE: "fee-structure",
  STUDENTFEES: "student-fees",
  STUDENTDETAIL: "studentsDetail",
  // CREATE_STUDENTS:"add-students"
} as const;

export type UNIVERSITY_SECTION_PAGES_ROUTES =
  (typeof UNIVERSITY_SECTION_TYPE)[keyof typeof UNIVERSITY_SECTION_TYPE];
