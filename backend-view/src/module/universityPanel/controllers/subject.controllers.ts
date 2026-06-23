import { Request, Response } from "express";
import pool from "@src/db/db.js";
import { Subject } from "@src/module/universityPanel/models/subject.model.js";
import { validateSubject } from "@src/module/universityPanel/validation/subject.validation.js";
import { validateId } from "@src/validation/common.validation.js";




// CREATE SUBJECT
export const createSubjects = async (req: Request, res: Response) => {
  try {
    const subject: Subject = req.body;
    const subError = validateSubject(subject);

    if (subError) {
      return res.json({
        sucess: false,
        message: subError,
      });
    }

    const result = await pool.query(
      `
      INSERT INTO subjects
      (
        subject_name,
        subject_code,
        credits,
        semester_id,
        course_name
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        subject.subject_name,
        subject.subject_code,
        subject.credits,
        subject.semester_id,
        subject.course_name,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error in creating Subjects",
    });
  }
};

// GET SUBJECTS
export const getSubjects = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search || "");
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `
      SELECT
        subjects.id,
        subjects.subject_name,
        subjects.subject_code,
        subjects.credits,
        semesters.semester_number,
        subjects.course_name,
        semesters.course_id
      FROM subjects
      JOIN semesters
        ON subjects.semester_id = semesters.id
      WHERE
        subjects.subject_name ILIKE $1
        OR subjects.subject_code ILIKE $1
      ORDER BY subjects.id ASC
      LIMIT $2
      OFFSET $3
      `,
      [`%${search}%`, limit, offset],
    );

    const countResult = await pool.query(
      `
      SELECT COUNT(*) 
      FROM subjects
      WHERE
        subject_name ILIKE $1
        OR subject_code ILIKE $1
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
      message: "Error in fetching Subjects",
    });
  }
};

// get Subject with Id
export const getSubjectById = async (req: Request, res: Response) => {
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
        SELECT * FROM 
          subjects WHERE 
          id = $1
        `,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        sucess: false,
        message: "Subject not found",
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error to  fetch details  for the  subject",
    });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subject: Subject = req.body;
    const idError = validateId(id);
    const subError = validateSubject(subject);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError,
      });
    }
    if (subError) {
      return res.status(400).json({
        success: false,
        message: subError,
      });
    }

    const result = await pool.query(
      `
          UPDATE subjects
          SET
            subject_name = $1,
            subject_code = $2,
            credits = $3,
            semester_id = $4,
            course_name = $5
          WHERE id = $6
          RETURNING *
          `,
      [
        subject.subject_name,
        subject.subject_code,
        subject.credits,
        subject.semester_id,
        subject.course_name,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: " This id of Subject  data not found in Db",
      });
    }
    res.status(200).json({
      success: true,
      message: "Subject updated successfully !!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in updating Subject",
    });
  }
};

// delete Subject

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError,
      });
    }
    const deleteSub = await pool.query(
      `
      DELETE from subjects 
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    if (deleteSub.rows.length === 0) {
      return res.status(400).json({
        succes: false,
        message: "Subject  not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Subject deleted Successfully!!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting Subject",
    });
  }
};

export const getSubjectDashboard = async (req: Request, res: Response) => {
  try {
    const totalResult = await pool.query(`
      SELECT COUNT(*) AS total
      FROM subjects
    `);
    const dashboardResult = await pool.query(`
      SELECT
        subjects.course_name,
        semesters.semester_number,
        COUNT(subjects.id) AS total_subjects,
        ARRAY_AGG(subjects.subject_name) AS subject_names
        FROM subjects
        JOIN semesters
        ON subjects.semester_id = semesters.id
        GROUP BY
        subjects.course_name,
        semesters.semester_number
        ORDER BY
        subjects.course_name,
        semesters.semester_number
    `);

    const courseResult = await pool.query(
      `
     select DISTINCT course_name,
    count(*)  as total_subjects  from 
    subjects 
    GROUP BY course_name
    ORDER BY course_name`,
    );

    const semesterWise = dashboardResult.rows.map((item) => ({
      courseName: item.course_name,
      semester: item.semester_number,
      totalSubjects: Number(item.total_subjects),
      subjects: item.subject_names,
    }));

    res.status(200).json({
      success: true,
      totalSubjects: Number(totalResult.rows[0].total),
      courses: courseResult.rows.map((item) => ({
        courseName: item.course_name,
        totalSubjects: Number(item.total_subjects),
      })),
      semesterWise,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching Subject Dashboard",
    });
  }
};
