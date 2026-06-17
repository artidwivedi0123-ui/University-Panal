export interface IStudentProfileData {
  id: number;
  name: string;
  rollNumber: string;
  gender: string;
  course: string;
  semester: number | any;
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
  amount_paid: number;
  due_amount: number;
  payment_status: string;
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