import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * =========================
 * USER SCHEMA
 * HelloLobby - Authentication Core Model
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
    passwordChangedAt: Date,
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
 * PASSWORD HASHING MIDDLEWARE
 * =========================
 */
userSchema.pre("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

/**
 * =========================
 * PASSWORD COMPARISON METHOD
 * =========================
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;