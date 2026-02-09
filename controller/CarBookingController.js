import Car from "../models/carModal.js";
import Booking from "../models/bookingModal.js";

// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const loggedInUserId = req.id;
    console.log("is logged  in user id getting here",loggedInUserId)

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const car = await Car.findById(carId);


    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // ❌ Own car booking block
    if (car.userId && car.userId.toString() === loggedInUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own car",
      });
    }

    // ❌ Status check
    if (car.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Car not available",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking dates",
      });
    }

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const totalAmount = totalDays * car.dailyPrice;

    const booking = await Booking.create({
      carId,
      userId: loggedInUserId,
      startDate,
      endDate,
      totalAmount,
      bookingStatus: "pending",
      paymentStatus: "pending",
    });

    // Car status update
    car.status = "booked";
    await car.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= PAY BOOKING =================
export const payBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
      booking,
    });
  } catch (error) {
    console.error("Pay Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= GET MY BOOKINGS =================
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.id; // instead of req.user.id

    const bookings = await Booking.find({ userId })
      .populate("carId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
