import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createStatus,
  getStatuses,
  viewStatus,
  deleteStatus,
  updateStatus
} from "../controllers/statusController.js";

const router = express.Router();

// ➕ Create
router.post("/", protect, createStatus);

// 📥 Get all
router.get("/", protect, getStatuses);

// 👁️ View
router.get("/:id", protect, viewStatus);

//update
router.patch("/:id", protect, updateStatus); // <-- ADD THIS
// ❌ Delete
router.delete("/:id", protect, deleteStatus);

export default router;