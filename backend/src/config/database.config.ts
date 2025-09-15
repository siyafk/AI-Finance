import mongoose from "mongoose";
import { Env } from "./env.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });
    console.log(`🟢 Connected to Mongo Database`);
  } catch (err) {
    console.log(`🔴 Error connecting to Mongo Database : ${err}`);
    process.exit(1);
  }
};

export default connectDatabase
