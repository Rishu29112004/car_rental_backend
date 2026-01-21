import express from "express";
import {
  checkAuth,
  login,
  logout,
  refreshToken,   // 🔁 name match controller
  register,
} from "../controller/AuthController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */
// anyone can access
router.post("/register", register);
router.post("/login", login);

/* ================= PROTECTED ROUTES ================= */
// login required
router.post("/refresh-token", authenticateUser, refreshToken);
router.post("/logout", authenticateUser, logout);
router.get("/me", authenticateUser, checkAuth);

export default router;
