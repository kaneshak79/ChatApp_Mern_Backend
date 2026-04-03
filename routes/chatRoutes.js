import express from "express";
import {
  createChat,
  createGroup,
  pinChat,
  exportChat,
  exportChatText
} from "../controllers/chatController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChat);
router.post("/group", protect, createGroup);

// 📌 Pin chat
router.put("/pin/:id", protect, pinChat);

// 📤 Export chat
router.get("/export/:chatId", protect, exportChat);
router.get("/export-text/:chatId", protect, exportChatText);

export default router;