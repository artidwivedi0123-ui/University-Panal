import { StudentFees } from "../models/student-fees.model.js";

export const validateStudentFees = (
  fees: StudentFees
): string | null => {
  const {
    student_id,
    fee_structure_id,
    amount_paid,
    payment_date,
  } = fees;

  switch (true) {
    case !student_id:
      return "Student Id is required";

    case isNaN(Number(student_id)):
      return "Student Id must be a valid number";

    case !fee_structure_id:
      return "Fee Structure Id is required";

    case isNaN(Number(fee_structure_id)):
      return "Fee Structure Id must be a valid number";

    case amount_paid === undefined:
      return "Amount Paid is required";

    case isNaN(Number(amount_paid)):
      return "Amount Paid must be a valid number";

    case Number(amount_paid) < 0:
      return "Amount Paid cannot be negative";

    case !payment_date:
      return "Payment Date is required";

    case isNaN(Date.parse(payment_date ??  "")):
      return "Payment Date is invalid";

    default:
      return null;
  }
};