// only starts server
// connects DB
// listens on port

import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

/**
 * ========================
 * DATABASE CONNECTION
 * ========================
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected ✅: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error.message);
    process.exit(1); // stop server if DB fails
  }
};

/**
 * ========================
 * START SERVER
 * ========================
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

startServer();