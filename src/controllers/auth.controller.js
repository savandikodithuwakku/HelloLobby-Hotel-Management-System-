import { registerUserService } from "../services/auth.service.js";

/**
 * =========================
 * REGISTER CONTROLLER
 * =========================
 * Handles HTTP request/response only
 */

export const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};