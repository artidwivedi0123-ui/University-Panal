import { Request, Response } from "express";
import pool from "../../../db/db.js";
import { StudentFees } from "../models/student-fees.model.js";
import { validateStudentFees } from "../validation/student-fee.validation.js";
import { validateId } from "../../../validation/common.validation.js";

// create Student Fees
export const createStudentFees = async (req: Request, res: Response) => {
  try {
    const studeFees: StudentFees = req.body;
    const fetchResultForFees = await pool.query(
      `
      SELECT total_fee 
      FROM fee_structure 
      WHERE id = $1`,
      [studeFees.fee_structure_id],
    );
    if (fetchResultForFees.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Fees Structure is not found",
      });
    }
    const total_fee = Number(fetchResultForFees.rows[0].total_fee);
    const due_amount = total_fee - Number(studeFees.amount_paid);
    let payment_status = "Pending";
    if (Number(due_amount <= 0)) {
      payment_status = "Paid";
    } else if (Number(studeFees.amount_paid) > 0) {
      payment_status = "Partial";
    }

    const studefeesValid = validateStudentFees(studeFees);
    if (studefeesValid) {
      return res.status(404).json({
        success: false,
        message: studefeesValid,
      });
    }

    const result = await pool.query(
      `
 INSERT INTO student_fees
 (
   student_id,
   fee_structure_id,
   amount_paid,
   due_amount,
   payment_status,
   payment_date
 )
 VALUES ($1,$2,$3,$4,$5,$6)
 `,
      [
        studeFees.student_id,
        studeFees.fee_structure_id,
        studeFees.amount_paid,
        due_amount,
        payment_status,
        studeFees.payment_date,
      ],
    );
    res.status(201).json({
      success: true,
      message: "Student Fees Added Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while Adding Student Payment",
    });
  }
};

//  get all Students Fees
export const getStudentFees = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;
    const studentFees = await pool.query(
      `
SELECT
    student_fees.id,
    students.name,
    students.roll_number,
    courses.course_name,
    semesters.semester_number,
    fee_structure.total_fee,
    student_fees.amount_paid,
    student_fees.due_amount,
    student_fees.payment_status,
    student_fees.payment_date
FROM student_fees
JOIN students
  ON students.id = student_fees.student_id
JOIN fee_structure
  ON fee_structure.id = student_fees.fee_structure_id
JOIN courses
  ON courses.id = fee_structure.course_id
JOIN semesters
  ON semesters.id = fee_structure.semester_id
WHERE students.name ILIKE $1
   OR courses.course_name ILIKE $1
   OR students.roll_number::TEXT ILIKE $1
ORDER BY student_fees.id ASC
LIMIT $2
OFFSET $3
`,
      [`%${search}%`, limit, offset],
    );

    const countResult = await pool.query(
      `
SELECT COUNT(*)
FROM student_fees
JOIN students
  ON students.id = student_fees.student_id
JOIN fee_structure
  ON fee_structure.id = student_fees.fee_structure_id
JOIN courses
  ON courses.id = fee_structure.course_id
JOIN semesters
  ON semesters.id = fee_structure.semester_id
WHERE students.name ILIKE $1
   OR courses.course_name ILIKE $1
   OR students.roll_number::TEXT ILIKE $1
`,
      [`%${search}%`],
    );

    const totalRecords = Number(countResult.rows[0].count);
    res.status(200).json({
      success: true,
      data: studentFees.rows,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPage: Math.ceil(totalRecords / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      messages: "Error in fetch students Fess Details",
    });
  }
};

export const deleteStudentFees = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);

    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError,
      });
    }
    const result = await pool.query(
      `
      DELETE FROM 
      student_fees 
      WHERE id = $1 
      RETURNING *
      `,
      [id],
    );
    res.status(200).json({
      success: true,
      message: "Student Fees Record is deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting student Fees Structure",
    });
  }
};

export const getStudentFeesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError,
      });
    }

    const resultById = await pool.query(
      `
      SELECT * FROM 
      student_fees 
      WHERE id = $1
      `,
      [id],
    );
    res.status(200).json({
      success: true,
      data: resultById.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching student detail ",
    });
  }
};

export const updateStudentFees = async (req: Request, res: Response) => {
  try {
    const studeFees: StudentFees = req.body;
    const { id } = req.params;
    const idError = validateId(id);
    const studefeesValid = validateStudentFees(studeFees);

    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError,
      });
    }

    if (studefeesValid) {
      return res.status(400).json({
        success: false,
        message: studefeesValid,
      });
    }

    const feeResult = await pool.query(
      `
      SELECT total_fee
      FROM fee_structure
      WHERE id = $1
      `,
      [studeFees.fee_structure_id],
    );

    if (feeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Fee Structure not found",
      });
    }
    const total_fee = Number(feeResult.rows[0].total_fee);
    const due_amount = total_fee - Number(studeFees.amount_paid);
    let payment_status = "Pending";

    if (due_amount <= 0) {
      payment_status = "Paid";
    } else if (Number(studeFees.amount_paid) > 0) {
      payment_status = "Partial";
    }

    const result = await pool.query(
      `
      UPDATE student_fees
      SET
        student_id = $1,
        fee_structure_id = $2,
        amount_paid = $3,
        due_amount = $4,
        payment_status = $5,
        payment_date = $6
        WHERE id = $7
        RETURNING *
      `,
      [
        studeFees.student_id,
        studeFees.fee_structure_id,
        studeFees.amount_paid,
        due_amount,
        payment_status,
        studeFees.payment_date,
        id,
      ],
    );

    res.status(200).json({
      success: true,
      message: "Student Fees Updated Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error while updating student fees",
    });
  }
};
