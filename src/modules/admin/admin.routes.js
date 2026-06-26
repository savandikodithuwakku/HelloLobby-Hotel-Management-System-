import express from "express";
import { protect, authorizeRoles } from "../auth/auth.middleware.js";

const router = express.Router();

/**
 * =========================
 * ADMIN ROUTES
 * =========================
 */

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin", "super_admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin Dashboard",
    });
  }
);

export default router;
