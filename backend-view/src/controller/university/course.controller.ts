import { Request, Response } from "express";
import pool from "../../db/db.js";

// Create Course
export const createCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      course_name,
      course_type,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO courses
      (course_name, course_type)
      VALUES ($1,$2)
      RETURNING *
      `,
      [course_name, course_type]
    );

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error while Creating Course",
    });
  }
};

// Get All Courses
export const getCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM courses
      ORDER BY id ASC
    `);

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching Courses",
    });
  }
};

// Get Course By Id
export const getCourseById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM courses
      WHERE id = $1
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
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching Course",
    });
  }
};

// Update Course
export const updateCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      course_name,
      course_type,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE courses
      SET
        course_name = $1,
        course_type = $2
      WHERE id = $3
      RETURNING *
      `,
      [
        course_name,
        course_type,
        id,
      ]
    );

    // if (result.rows.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Course not found",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error Updating Course",
    });
  }
};

// Delete Course
export const deleteCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM courses
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
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error deleting Course",
    });
  }
};