import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { 
  checkAuth, 
  forgotPassword, 
  login, 
  logout, 
  refreshToken, 
  register, 
  resetPassword, 
  updateProfile, 
  changePassword 
} from "../controllers/AuthController.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshToken);

// Protected routes (require authentication)
router.get("/me", authenticateUser, checkAuth);
router.put("/profile", authenticateUser, updateProfile);
router.put("/change-password", authenticateUser, changePassword);
router.post("/logout", authenticateUser, logout);

export default router;