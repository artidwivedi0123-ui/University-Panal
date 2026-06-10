

export interface IFeeStructureInput {
    course_id:number;
    semester_id:number;
    tuition_fee:number;
    exam_fee:number;
    library_fee:number;
    other_fee:number;
    total_fee?:number;
}


export interface IFeesDetailsById {
     id?:number;
    course_id:number,
    semester_id:number,
    tuition_fee:number;
    exam_fee:number;
    library_fee:number;
    other_fee:number;
    total_fee?:number;
};

export interface IFeesDetailsByIdResponse{
    success:boolean;
    data:IFeesDetailsById;
}

export interface IFeeStructureData {
    id?: number;
    course_id: number;
    semester_id: number;
    course_name: string;
    semester_number: number;
    total_fee: number;
}


export interface IFeeStructureResponse {
    success:boolean;
    data:IFeeStructureData[];
    pagination :{
        page:number;
        limit:number;
        totalRecords:number;
        totalPage:number;
    };
};


export interface IFeeDashboardCourse {
  id: number;
  course_name: string;
  tuition_fee: string;
  exam_fee: string;
  library_fee: string;
  other_fee: string;
  total_fee: string;
}



export interface IFeeDashboardData {
  totalFee: number;
  courses: IFeeDashboardCourse[];
}

export interface IFeeDashboardResponse {
  success: boolean;
  data: IFeeDashboardData;
}

