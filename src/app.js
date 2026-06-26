// middleware setup
// routes setup
// API structure

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

/**
 * ========================
 * MIDDLEWARE SETUP
 * ========================
 */

// Allow frontend to access backend
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL encoded data (forms)
app.use(express.urlencoded({ extended: true }));

/**
 * ========================
 * ROUTES SETUP
 * ========================
 */
app.use("/api/v1/auth", authRoutes);

/**
 * ========================
 * HEALTH CHECK ROUTE
 * ========================
 * Used to test if API is running
 */
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HelloLobby API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

export default app;
