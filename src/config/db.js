import mongoose from "mongoose";
import { MONGO_USER, MONGO_PASS } from "../utils/constants.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.9h38u.mongodb.net/whatsapp-clone`
    );
    console.log("Connected to MongoDB..");
  } catch (error) {
    console.log(error);
  }
};
