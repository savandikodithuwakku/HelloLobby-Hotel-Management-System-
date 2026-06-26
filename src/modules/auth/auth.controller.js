import {registerUserService,loginUserService,} from "./auth.service.js";

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

/**
 * =========================
 * LOGIN CONTROLLER
 * =========================
 */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const data = await loginUserService(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
