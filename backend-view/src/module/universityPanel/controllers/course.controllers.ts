import { Request,Response } from "express";
import pool from "../../../db/db.js";
import { Course } from "../models/course.model.js";
import { validateCourse } from "../validation/course.validation.js";
import { validateId } from "../../../validation/common.validation.js";


/*
  Note:
  Course CRUD APIs (create, getById, update, delete) are implemented
  and available for backend testing and future expansion.

  However, in the current University Panel UI, courses are treated as
  master data and are usually predefined by the administration.

  Therefore, the frontend currently uses only the GET API to display
  course information (cards, dropdowns, etc.).

  The remaining CRUD operations are primarily available for:
  - Postman testing
  - Admin panel extensions
  - Future feature development
*/


// Create Course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const course : Course = req.body;
 const error =  validateCourse(course);

 if(error) {
  return  res.status(400).json({
    success:false,
    message:error,
  });
 }
    const result = await pool.query(
      `
      INSERT INTO courses
      (course_name, course_type,total_semesters)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [course.course_name, course.course_type,course.total_semesters],
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
export const getCourse = async (req: Request, res: Response) => {
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
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const idError = validateId(id);

    if(idError) {
      return res.status(404).json({
        success:false,
        message:idError,
      })
    }
    const result = await pool.query(
      `
      SELECT *
      FROM courses
      WHERE id = $1
      `,
      [id],
    );
// Invalid id Data validation like /4746 not found in DB
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course Id is not found in DB",
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
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course:Course  = req.body;
    const IdEror = validateId(id);
    const error = validateCourse(course);

    if(error) {
      return res.status(404).json({
        success:false,
        message:error,
      });
    }

    if(IdEror){
      return  res.status(404).json({
        success:false,
        message:IdEror
      });
    }

    const result = await pool.query(
      `
      UPDATE courses
      SET
        course_name = $1,
        course_type = $2,
        total_semesters = $3
      WHERE id = $4
      RETURNING *
      `,
      [course.course_name, course.course_type, id],
    );

    //  Invalid data validation with id /4583 not found in DB
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course Id is not found  in DB",
      });
    }
  
    

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
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);
    if(idError) {
      return res.status(404).json({
        success:false,
        message:idError
      });
    }
    const result = await pool.query(
      `
      DELETE FROM courses
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    // Invalid Data validation /3943 not found in DB
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course Id  not found in DB",
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
