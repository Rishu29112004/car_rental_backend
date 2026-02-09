import express from "express";
import cors from "cors";
import { connectDb } from "./config/dbConnect.js";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";
import carRouter from "./routes/carRouter.js";
import authDashboard from "./routes/authDashboard.js";
import profileRouter from "./routes/userRouter.js";
import bookingRouter from "./routes/userBooking.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/cars", carRouter);
app.use("/api/dashboard", authDashboard);
app.use("/api/profile", profileRouter);
app.use("/api", bookingRouter);

// DB Connect
await connectDb();

export default app;
