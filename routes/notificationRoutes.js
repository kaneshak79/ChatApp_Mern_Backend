import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadNotifications
} from "../controllers/notificationController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔔 Get all
router.get("/", protect, getNotifications);

// 🔢 Unread count
router.get("/unread", protect, getUnreadNotifications);

// ✔ Mark read
router.put("/read/:id", protect, markAsRead);
router.put("/read-all", protect, markAllAsRead);

// ❌ Delete
router.delete("/:id", protect, deleteNotification);

export default router;