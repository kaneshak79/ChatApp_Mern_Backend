import express from "express";
import {
  updateProfile,
  blockUser,
  unblockUser,
  searchUsers,
  searchChats
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✏️ Profile
router.put("/profile", protect, updateProfile);

// 🚫 Block / unblock
router.put("/block/:id", protect, blockUser);
router.put("/unblock/:id", protect, unblockUser);

// 🔍 Search
router.get("/search", protect, searchUsers);
router.get("/search-chats", protect, searchChats);

export default router;