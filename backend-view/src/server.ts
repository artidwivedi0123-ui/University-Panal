import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js";
import courseRoutes from "./routes/university/course.routes.js";
import semesterRoutes from "./routes/university/semester.routes.js";
import subjectRoutes from "./routes/university/subject.routes.js";
import studentRoutes  from "./routes/university/student.routes.js"
import loginRoutes from "./routes/auth/login.routes.js";
import registerRoutes from "./routes/auth/register.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("University running with the  Backend");
});
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// auth routes

app.use("/auth/login",loginRoutes);
app.use("/auth/register",registerRoutes);


// university Panel Routes
app.use("/api/course",courseRoutes);
app.use("/api/semester",semesterRoutes);
app.use("/api/subject",subjectRoutes);
app.use("/api/student",studentRoutes);

// app.get("/test-db", async (req, res) => {

//   try {

//     const result = await pool.query(
//       "SELECT NOW()"
//     );

//     res.json({
//       success: true,
//       time: result.rows[0]
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false
//     });

//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});