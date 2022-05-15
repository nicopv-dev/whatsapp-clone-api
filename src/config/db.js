import mongoose from "mongoose";
import { MONGO_USER, MONGO_PASS } from "../utils/constants.js";

const URL_CONNECTION = "mongodb://localhost:27017/whatsapp-clone";

export const connectDB = async () => {
  try {
    await mongoose.connect(URL_CONNECTION);
    console.log("Connected to MongoDB..");
  } catch (error) {
    console.log(error);
  }
};
