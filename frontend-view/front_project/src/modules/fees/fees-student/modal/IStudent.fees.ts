export interface IStudentFeesData {
  id?: number;
  student_id: number;
  fee_structure_id: number;
  amount_paid: number;
  due_amount: number;
  payment_status: string;
  payment_date: string;
  created_at?: string;
}

export interface IStudentFeesInput {
  student_id: number;
  fee_structure_id: number;
  amount_paid: number;
  due_amount: number;
  payment_status: string;
  payment_date: string;
}

export interface IStudentFeesInputResponse {
  success: boolean;
  message: string;
  data: IStudentFeesData;
}


export interface IStudentFees {
  id?: number;
  name: string;
  roll_number: string;
  course_name: string;
  semester_number: number;
  total_fee: number;
  amount_paid: number;
  due_amount: number;
  payment_status: string;
  payment_date: string;
}

export interface IStudentFeesResponse {
        success:boolean;
        data:IStudentFees[];
        pagination :{
        page:number;
        limit:number;
        totalRecords:number;
        totalPage:number;
        }
}


export interface IStudentFeesDetailsById {
  id?: number;
  student_id: number;
  fee_structure_id: number;
  amount_paid: number;
  due_amount: number;
  payment_status: string;
  payment_date: string;
  created_at?: string;
}

export interface IStudentFeesDetailsByIdResponse {
  success: boolean;
  data: IStudentFeesDetailsById;
}