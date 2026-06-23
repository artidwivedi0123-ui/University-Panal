import { Request,Response  } from "express";
import pool from "@src/db/db.js";
import { Semester } from "@src/module/universityPanel/models/semester.model.js";
import { validateSemesterInput } from "@src/module/universityPanel/validation/semester.validation.js";
import { validateId } from "@src/validation/common.validation.js";



//  Note: In Semester  Data the create,getId,update,delete are  not required  for  the UI as  in University Panel the  Semesters are
//  mostly defined so for UI there is  only the use  simple get api (for Card  form)
//  but  available  here  for  the Testing and Practice with the  Postman

// create Semester
export const createSemester = async (req: Request, res: Response) => {
  try {
    const semeseter: Semester = req.body;
    const error = validateSemesterInput(semeseter);

    if (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
    const result = await pool.query(
      `
            INSERT INTO semesters 
            (semester_number,course_id)
            VALUES ($1,$2)
            RETURNING * `,
      [semeseter.semester_number, semeseter.course_id],
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
//  get By Id
export const getSemesterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);

    if (idError) {
      return res.status(404).json({
        success: false,
        message: idError,
      });
    }
    const result = await pool.query(
      `
      SELECT *
      FROM semesters
      WHERE id = $1
      `,
      [id],
    );

    // Invalid Data validation like if /584444 not present in DB
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Semester Id is not found in DB",
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

// Update Semester
export const updateSemester = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const semeseter: Semester = req.body;
    const semError = validateSemesterInput(semeseter);
    const idError = validateId(id);

    if (idError) {
      return res.status(404).json({
        success: false,
        message: idError,
      });
    }
    // Fields validation

    if (semError) {
      return res.status(400).json({
        success: false,
        message: semError,
      });
    }

    const result = await pool.query(
      `
      UPDATE semesters
      SET
      semester_number = $1,
      course_id = $2
      WHERE
       id = $3
      RETURNING *
      `,
      [semeseter.semester_number, semeseter.course_id, semeseter.id],
    );

    // Invalid id Data validation like /48453 is  not found in DB

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

//  Delete Semester
export const deleteSemester = async (req: Request, res: Response) => {
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
      DELETE FROM semesters
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    // Invalid Data id Validation /5405 not found in DB

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Semester id  not found in DB",
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
