export enum CourseEnum  {
  UG= "UG",
  PG= "PG"
}

export interface Course {
  id?: number;
  course_name: string;
  course_type: CourseEnum;
  total_semesters: number;
}
