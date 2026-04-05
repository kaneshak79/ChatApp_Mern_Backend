import express from "express";
import {
  createChat,
  createGroup,
  pinChat,
  exportChat,
  exportChatText,
  getGroups,
  deleteGroup,
  updateGroup
} from "../controllers/chatController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChat);
router.post("/group", protect, createGroup);
router.get("/group", protect, getGroups);
router.delete("/group/:groupId", protect, deleteGroup);
router.put("/group/:groupId", protect, updateGroup);

// 📌 Pin chat
router.put("/pin/:id", protect, pinChat);

// 📤 Export chat
router.get("/export/:chatId", protect, exportChat);
router.get("/export-text/:chatId", protect, exportChatText);

export default router;