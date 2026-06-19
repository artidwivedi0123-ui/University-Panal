export interface IStudentProfileData {
  id: number;
  name: string;
  rollNumber: string;
  gender: string;
  course: string;
  course_type:string;
  semester: number | any;
  email:string;
  phoneNumber:string;
  address:string;
  city:string;
  state:string;
  country:string;
  dateOfBirth:string |any ;
  fatherName:string;
  motherName:string;
  previousSchool:string;
  previousCollege:string;
  previousStudyField:string;
}

export interface IStudentResult {
  marks: number;
  grade_points: number;
  result: string;
}

export interface IStudentSubject {
  subject_name: string;
  subject_code: string;
  credits?: number;
}

export interface IStudentFees {
  amount_paid: number |  any;
  due_amount: number | any;
  payment_status: string;
  payment_date:string | any  ;
}


export interface IStudentProfileResponse {
  success: boolean;
  data: {
    profile: IStudentProfileData;
    subjects: IStudentSubject[];
    fees: IStudentFees;
    results: IStudentResult;
  };
}