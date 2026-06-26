import bcrypt from "bcryptjs";
import User from "../user/user.model.js";
import jwt from "jsonwebtoken";

/**
 * =========================
 * REGISTER USER SERVICE
 * =========================
 * Business logic for user registration
 */

export const registerUserService = async (userData) => {
  const { name, email, password, role } = userData;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // 2. Hash password (SERVICE LAYER - IMPORTANT)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "customer",
  });

  // 4. Return safe user data (NEVER return password)
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

/**
 * =========================
 * LOGIN USER SERVICE
 * =========================
 */

export const loginUserService = async (email, password) => {
  // 1. Find user (include password explicitly)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // 3. Generate JWT Token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );

  // 4. Return safe response
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// ✔ bcrypt.compare()
// compares plain password vs hashed password
// ✔ jwt.sign()
// creates secure token
// ✔ select("+password")
// overrides Mongoose protection