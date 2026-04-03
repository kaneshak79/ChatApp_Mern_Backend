import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  },

  content: {
    type: String,
    default: ""
  },

  type: {
    type: String,
    enum: ["text", "image", "video", "audio", "file", "contact"],
    default: "text"
  },

  fileUrl: String,

  // 📞 contact
  contactData: {
    name: String,
    phone: String
  },

  // ✔ delivered
  deliveredTo: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  // ✔✔ seen
  seenBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  // 👁️ read
  readBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  // ❌ delete for me
  deletedFor: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  // ❌ delete for everyone
  isDeletedForEveryone: {
    type: Boolean,
    default: false
  },

  // ✏️ edit
  isEdited: {
    type: Boolean,
    default: false
  },

  // 🔁 reply
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }

}, { timestamps: true });

export default mongoose.model("Message", messageSchema);