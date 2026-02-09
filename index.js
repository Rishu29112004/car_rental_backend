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
  }),
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cars", carRouter);
app.use("/api/dashboard", authDashboard);

app.use("/api/profile", profileRouter);

app.use("/api", bookingRouter);

const PORT = process.env.PORT || 8080;
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to mongoDB. server not started", error);
    process.exit(1);
  }
};
startServer();
