import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  profilePic: {
    type: String,
    default: ""
  },

  bio: {
    type: String,
    default: ""
  },

  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  // 🔔 for push notifications
  fcmToken: {
    type: String,
    default: ""
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);