import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  startCall,
  endCall,
  updateCallStatus,
  getCallHistory
} from "../controllers/callController.js";

const router = express.Router();

router.post("/start", protect, startCall);
router.put("/end/:id", protect, endCall);
router.put("/status/:id", protect, updateCallStatus);
router.get("/", protect, getCallHistory);

export default router;