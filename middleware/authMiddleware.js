import jwt from "jsonwebtoken";
import response from "../utils/responseHandler.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response(res, 401, "Authorization header missing or invalid format");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return response(res, 401, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return response(res, 401, "Invalid token payload");
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    return response(res, 400, "Token validation failed", error.message);
  }
};

export default authenticateUser;
