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
            s.marks,
            s.grade_points,
            s.result,
            c.course_name,
            c.course_type,
            sem.semester_number,
            sp.email,
            sp.phone_number,
            sp.address,
            sp.city,
            sp.state,
            sp.country,
            sp.date_of_birth,
            sp.father_name,
            sp.mother_name,
            sp.previous_school,
            sp.previous_college,
            sp.previous_study_field
        FROM students s
        JOIN courses c
            ON c.id = s.course_id
        JOIN semesters sem
            ON sem.id = s.semester_id
        LEFT JOIN student_profile sp
            ON sp.student_id = s.id
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
      id: student.id,
      name: student.name,
      rollNumber: student.roll_number,
      gender: student.gender,
      email: student.email,
      phoneNumber: student.phone_number,
      address: student.address,
      city: student.city,
      state: student.state,
      country: student.country,
      dateOfBirth: student.date_of_birth,
      fatherName: student.father_name,
      motherName: student.mother_name,
      previousSchool: student.previous_school,
      previousCollege: student.previous_college,
      previousStudyField:
      student.previous_study_field,
      course: student.course_name,
      course_type:student.course_type,
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
