export interface IStudentsData {
  id: number;
  name: string;
  roll_number: string;
  gender: string;
  marks: number;
  grade_points: number;
  result: string;
  course_name: string;
  course_type: string;
  semester_number: number;
  course_id?: number;
  semester_id?: number;
  email: string;
  password?: string;
  user_id?: number;
}

export interface IAllStudentsResponse {
  success: boolean;
  data: IStudentsData[];
}

export interface IStudentResponse {
  success: boolean;
  data: IStudentsData[];

  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
  };
}

export interface IStudentsInput {
  name: string;
  roll_number: string;
  gender: string;
  marks: number;
  grade_points: number;
  result: string;
  course_id: number;
  semester_id: number;
  email: string;
  password?: string;
}

export interface IStudentById {
  id: number;
  name: string;
  roll_number: string;
  gender: string;
  course_id: number;
  semester_id: number;
  marks: number;
  grade_points: number;
  result: string;
  email: string;
  password?: string;
}

export interface IStudentByIdResponse {
  success: boolean;
  data: IStudentById;
}

export interface IStudentDashboard {
  course_name: string;
  course_type: string;
  semester_number: number;
  total_students: number;
  students: string[];
}

export interface IStudentCourseSummary {
  courseName: string;
  totalStudents: number;
}

export interface IStudentDashboardResponse {
  success: boolean;
  totalStudents: number;
  students: IStudentCourseSummary[];
  dashboard: IStudentDashboard[];
}
