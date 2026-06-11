export interface StudentFees {
    student_id:number;
    fee_structure_id:number;
    amount_paid:number;
    due_amount:number;
    payment_status:string;
    payment_date?:string;
}