import bcrypt from "bcryptjs";
import User from "../user/user.model.js";

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
