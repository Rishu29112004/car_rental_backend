import { uploadFileToCloudinary } from "../config/cloudanary.js";
import Car from "../models/carModal.js";
import response from "../utils/responseHandler.js";

/* =========================
   ADD CAR (ADMIN)
========================= */
export const addCar = async (req, res) => {
  try {
    const file = req.file;
    const carData = req.body;

    if (!file) {
      return response(res, 400, "Car image is required");
    }

    // Upload image to cloudinary
    const uploadedImage = await uploadFileToCloudinary(file);
    const imageUrl = uploadedImage.secure_url;

    const newCar = await Car.create({
      ...carData,
      image: imageUrl,
    });

    return response(res, 201, "Car added successfully", newCar);
  } catch (error) {
    console.error("Add car error:", { error });
    return response(res, 500, "Failed to add car", {
      error: error.message,
    });
  }
};

/* =========================
   GET ALL CARS (LIST + SEARCH)
========================= */
export const getCars = async (req, res) => {
  try {
    const search = req.query.search || "";

    const filter = search
      ? {
          $or: [
            { brand: new RegExp(search, "i") },
            { model: new RegExp(search, "i") },
            { location: new RegExp(search, "i") },
          ],
        }
      : {};

    const cars = await Car.find(filter).sort({ createdAt: -1 });

    return response(res, 200, "Cars fetched successfully", cars);
  } catch (error) {
    console.error("Get cars error:", error);
    return response(res, 500, "Failed to fetch cars", {
      error: error.message,
    });
  }
};

/* =========================
   GET SINGLE CAR BY ID
========================= */
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("check it out", id);

    const car = await Car.findById(id);

    if (!car) {
      return response(res, 404, "Car not found");
    }

    return response(res, 200, "Car fetched successfully", car);
  } catch (error) {
    console.error("Get car error:", error);
    return response(res, 500, "Failed to fetch car", {
      error: error.message,
    });
  }
};

/* =========================
   UPDATE CAR STATUS (ADMIN)
========================= */
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return response(res, 400, "Status is required");
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedCar) {
      return response(res, 404, "Car not found");
    }

    return response(res, 200, "Car updated successfully", updatedCar);
  } catch (error) {
    console.error("Update car error:", error);
    return response(res, 500, "Failed to update car", {
      error: error.message,
    });
  }
};

/* =========================
   DELETE CAR (ADMIN)
========================= */
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return response(res, 404, "Car not found");
    }

    return response(res, 200, "Car deleted successfully");
  } catch (error) {
    console.error("Delete car error:", error);
    return response(res, 500, "Failed to delete car", {
      error: error.message,
    });
  }
};
