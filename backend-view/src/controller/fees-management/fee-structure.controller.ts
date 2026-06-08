import { Request, Response } from "express";
import pool from "../../db/db.js";
//  create Fees Structure
export const createFeeStructure = async (req: Request, res: Response) => {
  try {
    const {
      course_id,
      semester_id,
      tuition_fee,
      exam_fee,
      library_fee,
      other_fee,
    } = req.body;

    const total_fee = tuition_fee + exam_fee + library_fee + other_fee;

    const result = await pool.query(
      `
            INSERT INTO fee_structure
            (
            course_id,
            semester_id,
            tuition_fee,
            exam_fee,
            library_fee,
            other_fee,
            total_fee)
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
            `,
      [
        course_id,
        semester_id,
        tuition_fee,
        exam_fee,
        other_fee,
        library_fee,
        total_fee,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Fees Added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error to added Fees Details",
    });
  }
};

// get Fess Structure  

export const getFeeStructure = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";
    const offset = (page -1) * limit; 

    const feeStruct = await pool.query(
      `
          select 
                fee_structure.id,
                courses.course_name,
                semesters.semester_number,
                fee_structure.tuition_fee,
                fee_structure.exam_fee,
                fee_structure.library_fee,
                fee_structure.other_fee,
                fee_structure.total_fee
                FROM fee_structure
                JOIN courses ON 
                fee_structure.course_id = courses.id
                JOIN semesters ON
                fee_structure.semester_id = semesters.id
                WHERE courses.course_name  ILIKE $1
                OR semesters.semester_number::TEXT ILIKE $1
                ORDER BY semesters.id ASC
                LIMIT $2
                OFFSET $3
            `,
            [`%${search}%`,limit,offset],
    );

  const countResult = await pool.query(
  `
  SELECT COUNT(*) 
  FROM fee_structure
  JOIN courses
    ON fee_structure.course_id = courses.id
  JOIN semesters
    ON fee_structure.semester_id = semesters.id
  WHERE courses.course_name ILIKE $1
     OR semesters.semester_number::TEXT ILIKE $1
  `,
  [`%${search}%`]
);

    const totalRecords = Number(countResult.rows[0].count);
    res.status(200).json({
      success: true,
      data: feeStruct.rows,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPage:Math.ceil(totalRecords /limit),
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error to fetch  fees Details",
    });
  }
};


// Update Fess Structure
export const updateFeesStructure = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      course_id,
      semester_id,
      tuition_fee,
      exam_fee,
      library_fee,
      other_fee,
    } = req.body;
    const total_fee = tuition_fee + exam_fee + library_fee + other_fee;
    const result = await pool.query(
      `
            UPDATE fee_structure 
            SET 
            course_id = $1,
            semester_id = $2,
            tuition_fee = $3,
            exam_fee = $4,
            library_fee = $5,
            other_fee = $6,
            total_fee = $7
            WHERE id = $8
            RETURNING * 
            `,
      [
        course_id,
        semester_id,
        tuition_fee,
        exam_fee,
        library_fee,
        other_fee,
        total_fee,
        id,
      ],
    );

    res.status(200).json({
      success: true,
      message: "Fees Structure Updated Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Updating structure of  the Fees",
    });
  }
};


// delete Fees Structure
export const deleteFeeStructure = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteResult = await pool.query(
      `
            DELETE FROM 
            fee_structure WHERE 
            id = $1
            RETURNING *
            `,
      [id],
    );

    res.status(200).json({
      success: true,
      message: "Fee Structure is deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      meesage: "Error in deleting Fees Structure",
    });
  }
};


//  get Fees Structure with the Id
export const getFeeStructureById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resultbyId = await pool.query(
      `
            SELECT * FROM 
            fee_structure 
            WHERE id = $1
            `,
      [id],
    );
    res.status(200).json({
      success: true,
      data: resultbyId.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error  to  fetch  this fees Structure",
    });
  }
};
