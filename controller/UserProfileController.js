import User from "../models/userModal.js";
import response from "../utils/responseHandler.js";
import { uploadFileToCloudinary } from "../config/cloudanary.js";

/* =========================
   UPDATE MY PROFILE (WITH FILE)
========================= */
export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.id; // comes from auth middleware
    const { name, phone, bio } = req.body; // JSON/text fields
    const file = req.file; // file from form-data

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;

    // Handle file upload
    if (file) {
      try {
        const uploadedImage = await uploadFileToCloudinary(file);
        updateData.imageUrl = uploadedImage.secure_url;
      } catch (uploadError) {
        return response(res, 500, "Failed to upload image", {
          error: uploadError.message,
        });
      }
    }

    // updateData====

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("name email phone bio imageUrl role");

    return response(res, 200, "Profile updated successfully", updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    return response(res, 500, "Internal server error", { error: error.message });
  }
};

/* =========================
   GET MY PROFILE
========================= */
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.id; // comes from token

    const user = await User.findById(userId)
      .select("name email phone bio imageUrl role");

    return response(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    console.error("Get profile error:", error);
    return response(res, 500, "Internal server error", { error: error.message });
  }
};
