import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFileToCloudinary = (file) => {
    return new Promise((resolve, reject) => {  
        const options = {
            resource_type: file.mimetype.startsWith("video") ?  "video" : "image"
        };
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        }).end(file.buffer);
    });
};

const multerMiddleware = multer({ storage: multer.memoryStorage() });

export { multerMiddleware, uploadFileToCloudinary };