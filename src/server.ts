import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "./Middleware/errorHandle.middleware"; // นำเข้า Error Handling Middleware
import route from "./Routes/index";
import helmet from "helmet";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*", // ระวัง: ใช้ในการ development เท่านั้น
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware ทั่วไป
app.use(express.json());
app.use(route);
app.use(morgan("dev"));
app.use(helmet());

// Route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Error Handling Middleware (วางไว้ล่างสุด)
app.use(errorHandler);

const Port = process.env.Port || 3000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
