import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    // 🔗 Ownership
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🖼 Car Image
    imageUrl: {
      type: String,
      required: true,
    },

    // 🚘 Basic Info
    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    manufacturingYear: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: ["SUV", "SEDAN", "HATCHBACK", "LUXURY"],
      required: true,
    },

    transmission: {
      type: String,
      enum: ["MANUAL", "AUTOMATIC"],
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"],
      required: true,
    },

    seats: {
      type: Number,
      required: true,
      min: 2,
      max: 8,
    },

    // 📍 Location
    city: {
      type: String,
      required: true,
    },

    // 💰 Pricing
    dailyPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // 📝 Description
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    // 📦 Status (VERY IMPORTANT)
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
