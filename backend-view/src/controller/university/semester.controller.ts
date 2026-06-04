import { Request, Response } from "express";
import pool from "../../db/db.js";
export const createSemester = async (req: Request, res: Response) => {
  try {
    const { semester_number, course_id } = req.body;

    if (!semester_number || !course_id) {
      return res.status(400).json({
        success: false,
        message: "Semester number and course_id required",
      });
    }
    const result = await pool.query(
      `
            INSERT INTO semesters 
            (semester_number,course_id)
            VALUES ($1,$2)
            RETURNING * `,
      [semester_number, course_id],
    );
    res.status(201).json({
      success: true,
      message: "Semester Created Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while creating semester",
    });
  }
};

// get Semsester
export const getSemester = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
                `
                    SELECT
          semesters.id,
          semesters.semester_number,
          semesters.course_id,
          courses.course_name,
          courses.course_type
          FROM semesters
          JOIN courses
          ON semesters.course_id = courses.id
          ORDER BY semesters.id ASC;
                      `,
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching details",
    });
  }
};

export const getSemesterById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM semesters
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
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
      message: "Error fetching Semester",
    });
  }
};

export const updateSemester = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const {
      semester_number,
      course_id,
    } = req.body;
    const result = await pool.query(
      `
      UPDATE courses
      SET
      semester_number = $1,
      course_id = $2
      WHERE
       id = $3
      RETURNING *
      `,
      [
       semester_number,
       course_id,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Semester Updated Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error Updating Semester",
    });
  }
};

export const deleteSemester = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM semesters
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Semester Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error deleting Semester",
    });
  }
};
