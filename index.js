import express from "express";
import cors from "cors";
import { connectDb } from "./config/dbConnect.js";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const corsOption = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`server is running on https://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to mongoDB. server not started", error);
    process.exit(1);
  }
};
startServer();