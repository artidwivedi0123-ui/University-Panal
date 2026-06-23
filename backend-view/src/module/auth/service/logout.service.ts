import pool from "@src/db/db.js";

export const logoutService = async (userId: number) => {
  await pool.query(
    `
        UPDATE users 
        SET  refresh_token = NULL
        where id = $1
        `,
    [userId],
  );
  
};
