import express from "express";
import {
  addCar,
  getCars,
  getMyCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controller/CarController.js";

import authenticateUser from "../middleware/authMiddleware.js";
import { multerMiddleware } from "../config/cloudanary.js";

const carRouter = express.Router();

// Admin
carRouter.post(
  "/add-car",
  authenticateUser,
  multerMiddleware.single("image"),
  addCar,
);

carRouter.patch(
  "/update-car/:id",
  authenticateUser,
  multerMiddleware.single("image"),
  updateCar,
);
carRouter.delete("/delete-car/:id", authenticateUser, deleteCar);

// Public
carRouter.get("/", getCars); //allcars
carRouter.get("/my-cars", authenticateUser, getMyCars); // User's own cars
carRouter.get("/:id", getCarById);

export default carRouter;
