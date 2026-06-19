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

export const getStudentsDetails = async (req: Request, res: Response) => {
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
      [`%${search}%`, limit, offSet],
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
      [`%${search}%`],
    );

    const totalRecords = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error while fetching student details",
    });
  }
};

export const getStudentDetailsById = async (req: Request, res: Response) => {
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
            SELECT
          sp.*,
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
      WHERE sp.id = $1
      `,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student Profile is not Found",
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to fetch details for  this profile",
    });
  }
};

export const updateStudentDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const studentDetail: StudentDetailing = req.body;
    const idError = validateId(id);
    const studError = validateStudentDetailing(studentDetail);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError,
      });
    }
    if (studError) {
      return res.status(400).json({
        success: false,
        message: studError,
      });
    }

    const existingProfile = await pool.query(
      `SELECT id FROM student_profile WHERE id = $1`,
      [id],
    );

    if (existingProfile.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student Profile not found",
      });
    }
    const result = await pool.query(
      `
      UPDATE student_profile 
      SET 
          student_id = $1,
        full_name = $2,
        email = $3,
        phone_number = $4,
        address = $5,
        city = $6,
        state = $7,
        country = $8,
        date_of_birth = $9,
        father_name = $10,
        mother_name = $11,
        previous_school = $12,
        previous_college = $13,
        previous_study_field = $14
        WHERE id = $15
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
        id,
      ],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "This id of Student Profile is not found in DB",
      });
    }
    res.status(200).json({
      suceess: true,
      message: "Student Profile Updated Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while Updating  details of Student",
    });
  }
};

export const deleteStudentDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);
    if (idError) {
      return res.status(400).json({
        sucsess: false,
        message: idError,
      });
    }
    const result = await pool.query(
      `
      DELETE FROM 
      student_profile  
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student Profile is not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student Profile Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting Student Profile",
    });
  }
};
