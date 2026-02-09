import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },

    email: { 
      type: String, 
      unique: true, 
      required: true,
      lowercase: true,
      trim: true
    },

    password: { 
      type: String, 
      required: true
      // Later add select:false if needed
    },

    imageUrl: { 
      type: String, 
      default: "" 
    },

    resetPasswordExpires: { 
      type: Date, 
      default: null 
    },

    resetPasswordToken: { 
      type: String, 
      default: null 
    },

    phone: { 
      type: String, 
      default: "" 
    },

    bio: { 
      type: String, 
      default: "" 
    },

    role: {
      type: String,
      enum: ["USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
