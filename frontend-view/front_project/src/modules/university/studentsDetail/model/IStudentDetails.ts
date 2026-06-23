export interface IStudentDetailsData {
  id?: number;
  student_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  date_of_birth: string;
  father_name: string;
  mother_name: string;
  previous_school: string;
  previous_college: string;
  previous_study_field: string;
  course_name?: string;
  semester_number?: string;
}

export interface IStudentDetailsResponseData {
  success: boolean;
  data: IStudentDetailsData[] | any;
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
  };
}

export interface IStudentDetailInput {
  student_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  date_of_birth: string;
  father_name: string;
  mother_name: string;
  previous_school: string;
  previous_college?: string;
  previous_study_field: string;
}

export interface IStudentDetailsById {
  id?: number;
  student_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  date_of_birth: string;
  father_name: string;
  mother_name: string;
  previous_school: string;
  previous_college: string;
  previous_study_field: string;
}

export interface IStudentDetailsByIdResponse {
  success: boolean;
  data: IStudentDetailsById;
}
