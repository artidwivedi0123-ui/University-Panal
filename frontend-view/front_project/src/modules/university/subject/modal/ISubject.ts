export interface ISubjectData {
  id?: number;
  subject_name: string;
  subject_code: string;
  credits: number;
  semester_id: number;
  course_name: string;
}

export interface ISubjectInput {
  subject_name: string;
  subject_code: string;
  credits: number;
  semester_id: number;
  course_name: string;
}

export interface ISubjectById {
id: number;
  subject_name: string;
  subject_code: string;
  credits: number;
  semester_id: number;
  course_name: string;
}

export interface ISubjectByIdResponse {
    success:boolean;
    data:ISubjectById;
}

export interface ISubjectResponse {
  success: boolean;
  data: ISubjectData[];

  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
  };
}

export interface ICreateSubjectResponse {
  success: boolean;
  message: string;
  data: ISubjectData;
}

export interface ISubjectDashboard {
    courseName:string;
    semester:number;
    totalSubjects:number;
    subjects:string[];
}


export interface ICourseSummary {
  courseName: string;
  totalSubjects: number;
}

export interface ISubjectDashboardResponse {
  success: boolean;
  totalSubjects: number;
  courses: ICourseSummary[];
  semesterWise: ISubjectDashboard[];
};