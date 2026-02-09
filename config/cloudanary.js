import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const options = {
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    };

    // Check if file has path (disk storage) or buffer (memory storage)
    if (file.path) {
      // File saved to disk
      cloudinary.uploader.upload_large(file.path, options, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    } else if (file.buffer) {
      // File in memory - convert buffer to base64
      const base64Data = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      cloudinary.uploader.upload(base64Data, options, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    } else {
      reject(new Error("File must have either path or buffer"));
    }
  });
};

const storage = multer.memoryStorage();
const multerMiddleware = multer({ storage });

export { multerMiddleware, uploadFileToCloudinary };
