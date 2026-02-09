import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file from memory buffer to Cloudinary
const uploadFileToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("File must have a buffer"));
    }

    const base64Data = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const options = {
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    };

    cloudinary.uploader.upload(base64Data, options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

// Multer memory storage for serverless
const multerMiddleware = multer({ storage: multer.memoryStorage() });

export { multerMiddleware, uploadFileToCloudinary };
