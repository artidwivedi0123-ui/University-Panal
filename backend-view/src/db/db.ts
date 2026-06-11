import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.connect()
.then(()=>{
    console.log("PostgresSQL is  connected Successfully!!");
})
.catch(()=>{
    console.log("Error in Database Connection");
});

export default pool;