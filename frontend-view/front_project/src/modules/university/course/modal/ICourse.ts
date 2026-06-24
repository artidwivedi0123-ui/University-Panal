export enum ICourseEnum  {
  UG="UG",
  PG="PG"
}
export interface ICourseData {
  id?: number;
  course_name: string;
  course_type: ICourseEnum;
  total_semesters: number;
}

export interface ICourseResponse {
  success?: boolean;
  data: ICourseData[];
}

export interface ICourseInput {
  course_name: string;
  course_type: ICourseEnum;
  total_semesters: number;
}

export interface ICourseById {
  id: number;
  course_name: string;
  course_type: ICourseEnum;
  total_semesters: number;
}

export interface ICourseByIdResponse {
  success: boolean;
  data: ICourseById;
}
