import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { getAdminDashboardStats} from "../controller/AdminDasController.js";

const router = express.Router();

router.get(
  "/admin",
  authenticateUser,
  getAdminDashboardStats
);

export default router;
