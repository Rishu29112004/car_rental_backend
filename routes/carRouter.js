import express from "express";
import {
  addCar,
  getCars,
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

carRouter.put("/update-car/:id", authenticateUser, updateCar);
carRouter.delete("/delete-car/:id", authenticateUser, deleteCar);

// Public
carRouter.get("/", getCars); //allcars
carRouter.get("/:id", getCarById);

export default carRouter;
