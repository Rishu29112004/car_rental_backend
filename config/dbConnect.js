import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


const connectionString=process.env.MONGODB_URI;

export const connectDb=async()=>{
    try { 
          await mongoose.connect(connectionString);
          console.log("vehiql Db conected successfully");
    } catch (error) {
        console.error(" Error connecting to MongoDB:",error.message);
        throw error;
    }
}
