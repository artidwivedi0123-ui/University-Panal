import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import universityRoutes from "@src/module/universityPanel/routes/index.js";
import authRoutes from "@src/module/auth/routes/index.js";
import feesManagementRoutes from "@src/module/fees-management/routes/index.js";
import studentManagementRoutes from "@src/module/student-profile/routes/index.js";
import { ConfigURL } from "./config/config.js";
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
  }),
);
// auth routes
app.use("/auth", authRoutes);

// university Panel Routes
app.use("/api", universityRoutes);

// Fees Struture
app.use("/api", feesManagementRoutes);

// student Panel Routes
app.use("/api", studentManagementRoutes);

const PORT = ConfigURL.Port;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
