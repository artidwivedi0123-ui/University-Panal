import { Request, Response } from "express";
import pool from "../../db/db.js";

// add(create) students
export const createStudents = async (req: Request, res: Response) => {
  try {
    const {
      name,
      roll_number,
      gender,
      course_id,
      semester_id,
      marks,
      grade_points,
      result,
    } = req.body;
    //    console.log(course_id,semester_id);
    if (!course_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: "Please provided  the  Student's course and semester",
      });
    }
    const results = await pool.query(
      `
        INSERT INTO students 
        (name,roll_number,gender,course_id,semester_id,marks,grade_points,result) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *`,
      [
        name,
        roll_number,
        gender,
        course_id,
        semester_id,
        marks,
        grade_points,
        result,
      ],
    );
    res.status(201).json({
      success: true,
      message: "Student added Successfully",
      data: results.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error in adding students",
    });
  }
};

// get students
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

    const result = await pool.query(
      `
            SELECT * 
            from students 
            where id = $1
            `,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
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
    const {
      name,
      roll_number,
      gender,
      course_id,
      semester_id,
      marks,
      grade_points,
      result,
    } = req.body;

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
        name,
        roll_number,
        gender,
        course_id,
        semester_id,
        marks,
        grade_points,
        result,
        id,
      ],
    );
    if (results.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
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
        message: "Student not found",
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
