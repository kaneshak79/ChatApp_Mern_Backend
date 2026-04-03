import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createStatus,
  getStatuses,
  viewStatus,
  deleteStatus
} from "../controllers/statusController.js";

const router = express.Router();

// ➕ Create
router.post("/", protect, createStatus);

// 📥 Get all
router.get("/", protect, getStatuses);

// 👁️ View
router.get("/:id", protect, viewStatus);

// ❌ Delete
router.delete("/:id", protect, deleteStatus);

export default router;