export interface ISemesterData {
    id?:number;
    semester_number:number;
    course_id:number;
    course_type:string;
    course_name:string;
}

export  interface ISemesterResponse  {
    success:boolean;
    data:ISemesterData[];
}

export interface ISemesterInput {
    semester_number:number;
    course_id:number;
}
 