import { Request, Response } from "express";
import pool from "../../../db/db.js";
import { StudentDetailing } from "../model/student-detail.model.js";
import { validateId } from "../../../validation/common.validation.js";
import { validateStudentDetailing } from "../validations/student-detailing.validation.js";

// create Student Details
export const createStudentsDetails = async (req: Request, res: Response) => {
  try {
    const studentDetail: StudentDetailing = req.body;
    const studDetError = validateStudentDetailing(studentDetail);

    const existingProfile = await pool.query(
      `
            SELECT id
            FROM student_profile
            WHERE student_id = $1
            `,
      [studentDetail.student_id],
    );

    if (existingProfile.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Profile already exists",
      });
    }

    if (studDetError) {
      return res.status(400).json({
        success: false,
        message: studDetError,
      });
    }
    const result = await pool.query(
      `
        INSERT INTO student_profile 
        (
        student_id,
        full_name,
        email,
        phone_number,
        address,
        city,
        state,
        country,
        date_of_birth,
        father_name,
        mother_name,
        previous_school,
        previous_college,
        previous_study_field
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING *
        `,
      [
        studentDetail.student_id,
        studentDetail.full_name,
        studentDetail.email,
        studentDetail.phone_number,
        studentDetail.address,
        studentDetail.city,
        studentDetail.state,
        studentDetail.country,
        studentDetail.date_of_birth,
        studentDetail.father_name,
        studentDetail.mother_name,
        studentDetail.previous_school,
        studentDetail.previous_college,
        studentDetail.previous_study_field,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Student Details Added Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log("Error", error);

    res.status(500).json({
      success: false,
      message: "Error while Adding Students",
    });
  }
};

// Get Student Details

export const getStudentsDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search || "");
    const offSet = (page - 1) * limit;

    const result = await pool.query(
      `
      SELECT
        sp.id,
        sp.full_name,
        sp.email,
        sp.phone_number,
        sp.city,
        sp.state,
        sp.country,
        sp.previous_school,
        sp.previous_study_field,
        sp.date_of_birth,
        sp.father_name,
        sp.mother_name,
        sp.address,
        sp.previous_college,
        s.roll_number,
        c.course_name,
        sem.semester_number
      FROM student_profile sp
      JOIN students s
        ON sp.student_id = s.id
      JOIN courses c
        ON s.course_id = c.id
      JOIN semesters sem
        ON s.semester_id = sem.id
      WHERE
        sp.full_name ILIKE $1
        OR sp.email ILIKE $1
        OR s.roll_number ILIKE $1
      ORDER BY sp.id ASC
      LIMIT $2
      OFFSET $3
      `,
      [`%${search}%`, limit, offSet]
    );

    const countResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM student_profile sp
      JOIN students s
        ON sp.student_id = s.id
      WHERE
        sp.full_name ILIKE $1
        OR sp.email ILIKE $1
        OR s.roll_number ILIKE $1
      `,
      [`%${search}%`]
    );

    const totalRecords = Number(
      countResult.rows[0].count
    );

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(
          totalRecords / limit
        ),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Error while fetching student details",
    });
  }
};