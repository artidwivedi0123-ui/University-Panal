import pool from "../../db/db.js";
import bcrypt from "bcryptjs";


export const  registerService = async (
    full_name:string,
    email:string,
    password:string,
    role:string
) => {
    const exixtingUser  = await  pool.query(
        `
        SELECT * FROM users 
        WHERE email = $1
        `,
        [email]
    );

    if(exixtingUser.rows.length > 0) {
        throw new Error("Email already Exist");
    }
 
    const hashedPassword = await   bcrypt.hash(
        password,
        10
    );

    const result = await pool.query(
        `   INSERT INTO users
            (full_name,email,password,role) 
            VALUES 
            ($1,$2,$3,$4)
            RETURNING id,full_name,email,role
        `,
        [full_name,email,hashedPassword,role]
    );

    return result.rows[0];
}