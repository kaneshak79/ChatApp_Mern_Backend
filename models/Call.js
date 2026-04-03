import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  // 👥 participants
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],

  // 👤 caller
  caller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // 📞 type
  callType: {
    type: String,
    enum: ["audio", "video"],
    default: "audio"
  },

  // 👥 group or single
  isGroupCall: {
    type: Boolean,
    default: false
  },

  // 📊 status
  status: {
    type: String,
    enum: ["missed", "rejected", "ongoing", "ended"],
    default: "ongoing"
  },

  // ⏱ time
  startTime: {
    type: Date,
    default: Date.now
  },

  endTime: Date,

  // ⏳ duration (seconds)
  duration: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("Call", callSchema);