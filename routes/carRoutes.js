import express from "express";
import { addCar, manageBooking, manageCar } from "../controller/CarController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { multerMiddleware } from "../config/cloudnary.js";

const router = express.Router();

router.post("/add-car",authenticateUser,multerMiddleware.single("imageUrl"), addCar);
router.post("/manage-car",authenticateUser, manageCar);
router.post("/booking",authenticateUser,manageBooking);

export default router;
