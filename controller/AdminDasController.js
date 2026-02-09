import User from "../models/userModal.js";
import Car from "../models/carModal.js";
import response from "../utils/responseHandler.js";
import Booking from "../models/bookingModal.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    // 1️⃣ Logged-in user id (middleware se aata hai)
    const userId = req.id;

    if (!userId) {
      return response(res, 401, "Unauthorized");
    }

    // 2️⃣ User check + role check
    const user = await User.findById(userId);

    if (!user) {
      return response(res, 403, "Access denied. Admin only.");
    }

    // 3️⃣ Cars stats
    const totalCars = await Car.countDocuments({ userId });
    const activeCars = await Car.countDocuments({
      userId,
      status: "available",
    });

    const inactiveCars = await Car.countDocuments({
      userId,
      status: "inactive",
    });

    const cars = await Car.find({ userId });
    console.log("All Cars:", cars);

    console.log("Total Cars:", totalCars);
    console.log("Active Cars:", activeCars);
    console.log("Inactive Cars:", inactiveCars);

    console.log("User ID:", userId);
    console.log("User:", user);

    // 1️⃣ Get only cars which are currently booked
    const bookedCars = await Car.find({ userId, status: "booked" }).select(
      "_id",
    );
    const bookedCarIds = bookedCars.map((car) => car._id);

    // 2️⃣ Count bookings only for booked cars
    const totalBookings = await Booking.countDocuments({
      carId: { $in: bookedCarIds },
    });

    // 3️⃣a Get latest booking for admin's booked cars
    const latestBooking = await Booking.findOne({
      carId: { $in: bookedCarIds },
    })
      .sort({ createdAt: -1 }) // newest first
      .populate("carId") // optional, car details bhi chahiye
      .populate("userId", "name email"); // optional, user info bhi chahiye

    // 4️⃣ All-time revenue
    const allCars = await Car.find({ userId }).select("_id");
    const allCarIds = allCars.map((car) => car._id);

    const revenueData = await Booking.aggregate([
      {
        $match: {
          carId: { $in: allCarIds },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // 3️⃣b Booked cars (paymentStatus based)
    const bookedCarsData = await Booking.find({
      carId: { $in: allCarIds },
      paymentStatus: { $in: ["pending", "paid"] }, // ✅ filter by payment
    })
     .populate("carId") // ✅ sab details 
      .populate("userId", "name email") // user info
      .sort({ createdAt: -1 });

    // 4️⃣ Response
    return response(res, 200, "Dashboard stats fetched successfully", {
      totalCars,
      activeCars,
      inactiveCars,
      totalBookings,
      latestBooking,
      totalRevenue,
      bookedCarsData,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};
