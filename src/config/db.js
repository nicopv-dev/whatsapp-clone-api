import mongoose from "mongoose";
import { MONGO_USER, MONGO_PASS, MONGO_URI } from "../utils/constants.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB..");
  } catch (error) {
    console.log(error);
  }
};
