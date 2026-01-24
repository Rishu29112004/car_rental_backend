import { uploadFileToCloudinary } from "../config/cloudnary.js";
import Car from "../models/carModal.js";
import response from "../utils/responseHandler.js";

export const addCar = async (req, res) => {
  try {
    const ownerId = req.id;

    if (!ownerId) {
      return response(res, 401, "User not authenticated");
    }

    // 🔹 Trim + normalize all text fields
    const carData = {
      ...req.body,
      brand: req.body.brand?.trim(),
      model: req.body.model?.trim(),
      category: req.body.category?.trim(),
      transmission: req.body.transmission?.trim(),
      fuelType: req.body.fuelType?.trim(),
      city: req.body.city?.trim(),
      description: req.body.description?.trim(),

      // 🔹 Type casting (important)
      manufacturingYear: Number(req.body.manufacturingYear),
      seats: Number(req.body.seats),
      dailyPrice: Number(req.body.dailyPrice),
      isAvailable: req.body.isAvailable === "true",
    };

    if (!req.file) {
      return response(res, 400, "At least one image is required");
    }

    const uploadedImage = await uploadFileToCloudinary(req.file);

    const newCar = new Car({
      ...carData,
      ownerId,
      imageUrl: uploadedImage.secure_url, // 👈 single image
    });

    await newCar.save();

    return response(res, 201, "Car added successfully", newCar);
  } catch (error) {
    console.error("Add car error:", error);
    return response(res, 500, "Failed to add car", error.message);
  }
};

export const manageCar = async (req, res) => {
  try {
  } catch (error) {}
};

export const manageBooking = async (req, res) => {
  try {
  } catch (error) {}
};
