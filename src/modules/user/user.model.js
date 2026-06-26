import mongoose from "mongoose";

/**
 * =========================
 * USER SCHEMA
 * HelloLobby - Core Auth Model
 * =========================
 */

const userSchema = new mongoose.Schema(
  {
    // Basic identity
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password by default
    },

    // Role-based access control
    role: {
      type: String,
      enum: ["super_admin", "admin", "staff", "customer"],
      default: "customer",
    },

    // Account status control
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },

    // Security fields
    passwordChangedAt: {
      type: Date,
      default: null,
    },

    passwordResetToken: String,
    passwordResetExpires: Date,

    // Login tracking
    lastLoginAt: Date,
  },
  {
    timestamps: true,
  }
);

/**
 * =========================
 * INSTANCE METHOD
 * PASSWORD COMPARISON
 * =========================
 */
userSchema.methods.comparePassword = async function (enteredPassword, hashedPassword) {
  const bcrypt = await import("bcryptjs");
  return await bcrypt.default.compare(enteredPassword, hashedPassword);
};

const User = mongoose.model("User", userSchema);

export default User;