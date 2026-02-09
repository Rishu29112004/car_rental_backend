import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { updateMyProfile, getMyProfile } from "../controller/UserProfileController.js";
import { multerMiddleware } from "../config/cloudanary.js";

const profileRouter = express.Router();

// Update profile with optional file
profileRouter.put("/update/:id", authenticateUser, multerMiddleware.single("imageUrl"), updateMyProfile);

// Get my profile
profileRouter.get("/:id", authenticateUser, getMyProfile);

export default profileRouter;