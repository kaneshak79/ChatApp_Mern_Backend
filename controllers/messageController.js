import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import createNotification from "../utils/createNotification.js";
// import translate from "@vitalets/google-translate-api";
// import * as translate from "@vitalets/google-translate-api";
import { translate } from "@vitalets/google-translate-api";
import mongoose from "mongoose";
console.log("TYPE:", typeof translate);
console.log("FULL:", translate);

// 📤 SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { content, chatId, type, fileUrl } = req.body;

    if (!chatId) {
      return res.status(400).json({ msg: "chatId required" });
    }

    // const msg = await Message.create({
    //   sender: req.user._id,
    //   chat: chatId,
    //   content,
    //   type,
    //   fileUrl,
    //   deliveredTo: [req.user._id],
    //   readBy: [req.user._id]
    // });

    // import mongoose from "mongoose";

const msg = await Message.create({
  sender: req.user._id,
  chat: new mongoose.Types.ObjectId(chatId), // ✅ FIX
  content,
  type,
  fileUrl,
  deliveredTo: [req.user._id],
  seenBy: [req.user._id] // ✅ FIX
});

    // update latest message
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: msg._id
    });

    const chat = await Chat.findById(chatId).populate("users");

    // 🔔 notifications
    for (let user of chat.users) {
      if (user._id.toString() !== req.user._id.toString()) {
        createNotification(req.user._id, user._id, msg._id);
      }
    }

    res.json(msg);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✔ delivered
export const markDelivered = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ msg: "Message not found" });

    if (!msg.deliveredTo.includes(req.user._id)) {
      msg.deliveredTo.push(req.user._id);
      await msg.save();
    }

    res.json(msg);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✔✔ seen
export const markSeen = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ msg: "Message not found" });

    if (!msg.seenBy.includes(req.user._id)) {
      msg.seenBy.push(req.user._id);
      await msg.save();
    }

    res.json(msg);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ delete for me
export const deleteForMe = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ msg: "Message not found" });

    if (!msg.deletedFor.includes(req.user._id)) {
      msg.deletedFor.push(req.user._id);
      await msg.save();
    }

    res.json({ msg: "Deleted for me" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ delete for everyone
export const deleteForEveryone = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ msg: "Message not found" });

    if (msg.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    msg.isDeletedForEveryone = true;
    msg.content = "";
    msg.fileUrl = "";

    await msg.save();

    res.json({ msg: "Deleted for everyone" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✏️ edit
export const editMessage = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ msg: "Message not found" });

    if (msg.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    msg.content = req.body.content;
    msg.isEdited = true;

    await msg.save();

    res.json(msg);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📥 get messages
export const getChatMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
      deletedFor: { $ne: req.user._id }
    })
      .populate("sender", "name")
      .sort({ createdAt: -1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🌐 translate
export const translateMessage = async (req, res) => {
  try {
    const { text, to } = req.body;

    const result = await translate(text, { to });

    res.json({ translated: result.text });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// export const translateMessage = async (req, res) => {
//   try {
//     const { text, to } = req.body;

//     const result = await translate.translate(text, { to });

//     res.json({ translated: result.text });

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// 🔢 unread count
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      chat: req.params.chatId,
      readBy: { $ne: req.user._id }
    });

    res.json({ unread: count });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};