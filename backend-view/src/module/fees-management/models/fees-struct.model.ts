export interface FeesStructure {
    course_id:number;
    semester_id:number;
    tuition_fee:number;
    exam_fee:number;
    library_fee:number;
    other_fee:number;
    total_fee?:number
}