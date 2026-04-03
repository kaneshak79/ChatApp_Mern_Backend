

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
    trim: true
  },

  isGroupChat: {
    type: Boolean,
    default: false
  },

  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],

  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // 📌 Pin chat
  pinnedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  // 📨 Latest message
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }

}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);