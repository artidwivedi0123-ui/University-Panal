import { Response } from "express";
import { AuthRequest } from "../../auth/model/auth-req.model.js";
import pool from "../../../db/db.js";
export const getStudentProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    // 1. Student Profile
    const studentResult = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.roll_number,
        s.gender,
        c.course_name,
        sem.semester_number,
        s.marks,
        s.grade_points,
        s.result
      FROM students s
      JOIN courses c
        ON c.id = s.course_id
      JOIN semesters sem
        ON sem.id = s.semester_id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }
    const student = studentResult.rows[0];

        const subjectsResult = await pool.query(
      `
      SELECT
        subject_name,
        subject_code,
        credits
      FROM subjects
      WHERE course_name = $1
      AND semester_id = (
        SELECT semester_id
        FROM students
        WHERE user_id = $2
      )
      `,
      [student.course_name, userId]
    );

        const feesResult = await pool.query(
      `
      SELECT
        amount_paid,
        due_amount,
        payment_status,
        payment_date
      FROM student_fees sf
      JOIN students s
        ON s.id = sf.student_id
      WHERE s.user_id = $1
      ORDER BY sf.id DESC
      LIMIT 1
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      data: {
        profile: {
          name: student.name,
          rollNumber: student.roll_number,
          gender: student.gender,
          course: student.course_name,
          semester: student.semester_number,
        },
        subjects: subjectsResult.rows,
        fees: feesResult.rows[0] || {},
        results: {
          marks: student.marks,
          grade_points: student.grade_points,
          result: student.result,
        },
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
};
