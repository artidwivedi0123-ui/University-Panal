import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import refreshRoutes from  "../src/module/auth/routes/refresh.routes.js";
import logoutRoutes from "../src/module/auth/routes/logout.routes.js";
import courseRoutes from "../src/module/universityPanel/routes/course.routes.js";
import semesterRoutes from "../src/module/universityPanel/routes/semester.routes.js";
import subjectRoutes from "../src/module/universityPanel/routes/subject.routes.js";
import studentRoutes  from "../src/module/universityPanel/routes/student.routes.js"
import loginRoutes from "../src/module/auth/routes/login.routes.js";
import registerRoutes from "../src/module/auth/routes/register.routes.js";
import feesStructureRoutes from  "../src/module/fees-management/routes/fees-struct.routes.js";
import studentFeesRoutes from  "../src/module/fees-management/routes/student-fees.routes.js";
import studentProfileRoute from "../src/module/student-profile/routes/student-profile.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("University running with the  Backend");
});
app.use(
  cors({
    origin: process.env.FRONTENDURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// auth routes

app.use("/auth/",loginRoutes);
app.use("/auth/",registerRoutes);
app.use("/auth",logoutRoutes);
app.use("/auth",refreshRoutes);

// university Panel Routes
app.use("/api/course",courseRoutes);
app.use("/api/semester",semesterRoutes);
app.use("/api/subject",subjectRoutes);
app.use("/api/student",studentRoutes);

// Fees Struture 
app.use("/api/fee-structure",feesStructureRoutes);
app.use("/api/student-fees",studentFeesRoutes);

//  Student Profile 
app.use("/api/stud",studentProfileRoute);

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