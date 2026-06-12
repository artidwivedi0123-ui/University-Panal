import pool from "../../../db/db.js";
import jwt from "jsonwebtoken";

export const refreshService = async (refreshToken: string) => {
  const result = await pool.query(
    `
        SELECT  * FROM 
        users where refresh_token = $1
        `,
    [refreshToken],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid  Refresh Token");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

  const access_token = jwt.sign(
    {
        id:user.id,
        role:user.role,
    },
    process.env.JWT_SECRET as string, {
        expiresIn:"10m"
    }
)

return {
    access_token
}
};
