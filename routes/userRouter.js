import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { updateMyProfile, getMyProfile } from "../controller/UserProfileController.js";
import multer from "multer";

const profileRouter = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" }); // temporary storage

// Update profile with optional file
profileRouter.put("/update/:id", authenticateUser, upload.single("imageUrl"), updateMyProfile);

// Get my profile
profileRouter.get("/:id", authenticateUser, getMyProfile);

export default profileRouter;


