import User from "../models/userModal.js";
import response from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log("user")

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 400, "User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    return response(res, 200, "User registered successfully", {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );
    if (!user) {
      return response(res, 400, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response(res, 400, "Invalid password");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    return response(res, 200, "Login successful", {
      accessToken,
      refreshToken,
      role: user.role,
      name: user.name,
      email: user.email,
      _id: user._id,
      bio: user.bio,
      phone: user.phone,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    return response(res, 500, "Internal Server Error", error.message);
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return response(res, 401, "Unauthorized: refresh token required");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (!decoded?.userId) {
      return response(res, 401, "Invalid token payload");
    }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    return response(res, 200, "Token refreshed successfully", {
      accessToken: newAccessToken,
    });
  } catch (error) {
    return response(res, 401, "Invalid or expired refresh token");
  }
};

export const logout = async (req, res) => {
  try {
    return response(res, 200, "Logout successfully");
  } catch (error) {
    return response(res, 500, "Internal Server Error", error.message);
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req?.id;
    if (!userId) {
      return response(
        res,
        400,
        "Unauthorized, please login to access our page",
      );
    }
    const user = await User.findById(userId).select(
      "name email imageUrl phone bio",
    );
    return response(res, 200, "User retrived successfully", user);
  } catch (error) {
    return response(res, 500, "Internal server error ", error.message);
  }
};
