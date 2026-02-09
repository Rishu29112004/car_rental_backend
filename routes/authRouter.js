import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";

import {
  checkAuth,
  login,
  logout,
  refreshToken,
  register,
} from "../controller/AuthController.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */
router.post("/register", register);
router.post("/login", login);

/* ================= PROTECTED ROUTES ================= */
router.post("/refresh-token", authenticateUser, refreshToken);
router.post("/logout", authenticateUser, logout);
router.get("/me", authenticateUser, checkAuth);

export default router;
