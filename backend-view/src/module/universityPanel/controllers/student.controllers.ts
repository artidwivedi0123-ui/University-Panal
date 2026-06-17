import { Request, Response } from "express";
import pool from "../../../db/db.js";
import bcrypt from "bcryptjs";
import { Student } from "../models/student.model.js";
import { validateStudent } from "../validation/student.validation.js";
import { validateId } from "../../../validation/common.validation.js";

// add(create) students
export const createStudents = async (
  req: Request,
  res: Response
) => {
  try {
    const student: Student = req.body;

    const studError =
      validateStudent(student);

    if (studError) {
      return res.status(400).json({
        success: false,
        message: studError,
      });
    }

    // Check Roll Number
    const existingStudent =
      await pool.query(
        `
        SELECT id
        FROM students
        WHERE roll_number = $1
        `,
        [student.roll_number]
      );

    if (
      existingStudent.rows.length > 0
    ) {
      return res.status(409).json({
        success: false,
        message:
          "Roll Number already exists",
      });
    }

    // Check Email
    const existingUser =
      await pool.query(
        `
        SELECT id
        FROM users
        WHERE email = $1
        `,
        [student.email]
      );

    if (
      existingUser.rows.length > 0
    ) {
      return res.status(409).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    // Create User
    const hashedPassword =
      await bcrypt.hash(
        student.password!,
        10
      );

    const userResult =
      await pool.query(
        `
        INSERT INTO users
        (
          full_name,
          email,
          password,
          role
        )
        VALUES ($1,$2,$3,$4)
        RETURNING id
        `,
        [
          student.name,
          student.email,
          hashedPassword,
          "student",
        ]
      );

    const userId =
      userResult.rows[0].id;

    // Create Student
    const results =
      await pool.query(
        `
        INSERT INTO students
        (
          name,
          roll_number,
          gender,
          course_id,
          semester_id,
          marks,
          grade_points,
          result,
          user_id
        )
        VALUES
        (
          $1,$2,$3,$4,$5,
          $6,$7,$8,$9
        )
        RETURNING *
        `,
        [
          student.name,
          student.roll_number,
          student.gender,
          student.course_id,
          student.semester_id,
          student.marks,
          student.grade_points,
          student.result,
          userId,
        ]
      );

    res.status(201).json({
      success: true,
      message:
        "Student Added Successfully",
      data: results.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Error in adding student",
    });
  }
};


export const getAllStudents = async (req:Request,res:Response)=>{
  try {
    const resultData = await  pool.query(
      `
       SELECT
        students.id,
        students.name,
        students.roll_number,
        students.gender,
        students.marks,
        students.grade_points,
        students.result,
        courses.course_name,
        courses.course_type,
        semesters.semester_number
      FROM students
      JOIN courses
        ON students.course_id = courses.id
      JOIN semesters
        ON students.semester_id = semesters.id
        ORDER BY students.id ASC
      `,
    );
    res.status(200).json({
      success:true,
      data:resultData.rows,
    });
  }
  catch(error){
    console.log("Error Data",error);
  res.status(500).json({
    success:false,
    message:"Error in  Fetching Students",
  });
  }
}

// get students with pagination
export const getStudents = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;

    const results = await pool.query(
      `
      SELECT
        students.id,
        students.name,
        students.roll_number,
        students.gender,
        students.marks,
        students.grade_points,
        students.result,
        courses.course_name,
        courses.course_type,
        semesters.semester_number
      FROM students
      JOIN courses
        ON students.course_id = courses.id
      JOIN semesters
        ON students.semester_id = semesters.id
      WHERE
        students.name ILIKE $1
        OR students.roll_number ILIKE $1
      ORDER BY students.id ASC
      LIMIT $2
      OFFSET $3
      `,
      [`%${search}%`, limit, offset],
    );

    const countResult = await pool.query(
      `
      SELECT COUNT(*) FROM students
      WHERE
        name ILIKE $1
        OR roll_number ILIKE $1
      `,
      [`%${search}%`],
    );

    const totalRecords = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      data: results.rows,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching Students",
    });
  }
};

// get Student with id
export const getstudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);

    if (idError) {
      return res.status(400).json({
        sucess: false,
        message: idError,
      });
    }
    const result = await pool.query(
      `
            SELECT * 
            from students 
            where id = $1
            `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found in DB",
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error to fetch student's Details",
    });
  }
};

//update student

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student: Student = req.body;
    const isError = validateId(id);

    if (isError) {
      return res.status(400).json({
        sucess: false,
        message: isError,
      });
    }

    const existingStudent = await pool.query(
      `
    SELECT id
    FROM students
    WHERE roll_number = $1
    AND id != $2
    `,
      [student.roll_number, id],
    );

    if (existingStudent.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Roll Number already exists",
      });
    }
    const results = await pool.query(
      `
        UPDATE students
        SET
          name = $1,
          roll_number = $2,
          gender = $3,
          course_id = $4,
          semester_id = $5,
          marks = $6,
          grade_points = $7,
          result = $8
        WHERE id = $9
        RETURNING *
        `,
      [
        student.name,
        student.roll_number,
        student.gender,
        student.course_id,
        student.semester_id,
        student.marks,
        student.grade_points,
        student.result,
        id,
      ],
    );

    if (results.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student not found in DB",
      });
    }
    res.status(201).json({
      success: true,
      message: "Student 's Details updated Succesfully",
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating Details of Students",
    });
  }
};

// Delete Student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idError = validateId(id);

    if(idError) {
      return res.status(400).json({
        success:false,
        message:idError,
      })
    }

    const deleteStu = await pool.query(
      `
            DELETE from students 
            WHERE  id  = $1 
            RETURNING *
            `,
      [id],
    );

    if (deleteStu.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student Data  with Id  not found in  DB",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting  Student",
    });
  }
};

// get student Dshboard
export const getStudentDashboard = async (req: Request, res: Response) => {
  try {
    const totalResult = await pool.query(`
      SELECT COUNT(*) as total_students
      FROM students
    `);

    const dashboardResult = await pool.query(`
      SELECT
        courses.course_name,
        courses.course_type,
        semesters.semester_number,
        COUNT(students.id) as total_students,
        ARRAY_AGG(students.name) as students
      FROM students
      JOIN courses
        ON students.course_id = courses.id
      JOIN semesters
        ON students.semester_id = semesters.id
      GROUP BY
        courses.course_name,
        courses.course_type,
        semesters.semester_number
      ORDER BY
        courses.course_name,
        semesters.semester_number
    `);

    const studentResult = await pool.query(
      `
      select 
          courses.course_name,
          count (*) total_students
          from students
          JOIN  courses  ON 
            courses.id = students.course_id
            GROUP BY courses.course_name`,
    );

    res.status(200).json({
      success: true,
      totalStudents: Number(totalResult.rows[0].total_students),
      students: studentResult.rows.map((item) => ({
        courseName: item.course_name,
        totalStudents: Number(item.total_students),
      })),
      dashboard: dashboardResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching dashboard",
    });
  }
};
