import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    imageUrl: String,
    resetPasswordExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    phone: String,
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);