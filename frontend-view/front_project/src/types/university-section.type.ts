export const UNIVERSITY_SECTION_TYPE = {
    COURSES:"courses",
    SEMESTERS:"semesters",
    STUDENTS:"students",
    SUBJECTS:"subjects",
    FEESTRUCTURE:"fee-structure",
    STUDENTFEES:"student-fees"
    // CREATE_STUDENTS:"add-students"
} as  const;

export type UNIVERSITY_SECTION_PAGES_ROUTES = 
(typeof UNIVERSITY_SECTION_TYPE)[keyof typeof UNIVERSITY_SECTION_TYPE];