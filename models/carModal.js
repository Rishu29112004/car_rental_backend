import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    manufacturingYear: {
      type: Number,
      required: true,
    },

    dailyPrice: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["suv", "sedan", "hatchback", "luxury", "sports"],
    },

    transmission: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["manual", "automatic"],
    },

    fuelType: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["petrol", "diesel", "electric", "hybrid"],
    },

    seats: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["delhi", "pune", "bangalore", "chennai", "hyderabad"],
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      lowercase: true,
      enum: ["available", "booked", "inactive"],
      default: "available",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("Car", carSchema);
