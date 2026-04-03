import express from "express";
import {
  sendMessage,
  markDelivered,
  markSeen,
  deleteForMe,
  deleteForEveryone,
  editMessage,
  getChatMessages,
  translateMessage,
  getUnreadCount
} from "../controllers/messageController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);

router.get("/:chatId", protect, getChatMessages);

router.put("/delivered/:id", protect, markDelivered);
router.put("/seen/:id", protect, markSeen);

router.put("/delete-me/:id", protect, deleteForMe);
router.put("/delete-everyone/:id", protect, deleteForEveryone);

router.put("/edit/:id", protect, editMessage);

router.post("/translate", protect, translateMessage);

router.get("/unread/:chatId", protect, getUnreadCount);

export default router;