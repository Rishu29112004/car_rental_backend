import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";

import {
  createBooking,
  payBooking,
  getMyBookings
} from "../controller/CarBookingController.js";

const bookingRouter = express.Router();


// Create booking
bookingRouter.post("/booking", authenticateUser, createBooking);

// Pay booking
bookingRouter.patch("/booking/:bookingId/pay", authenticateUser, payBooking);

// Get my bookings
bookingRouter.get("/booking/my", authenticateUser, getMyBookings);

export default bookingRouter;