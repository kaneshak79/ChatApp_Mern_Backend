import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// 1️⃣ One-to-one chat
export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "UserId required" });
    }

    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] }
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat) return res.json(chat);

    chat = await Chat.create({
      isGroupChat: false,
      users: [req.user._id, userId]
    });

    chat = await chat.populate("users", "-password");

    res.json(chat);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 2️⃣ Create group
export const createGroup = async (req, res) => {
  try {
    const { name, users } = req.body;

    if (!name || !users) {
      return res.status(400).json({ msg: "Name and users required" });
    }

    if (users.length < 2) {
      return res.status(400).json({ msg: "Group needs at least 3 members" });
    }

    const allUsers = [...users, req.user._id];

    const chat = await Chat.create({
      chatName: name,
      users: allUsers,
      isGroupChat: true,
      groupAdmin: req.user._id
    });

    const fullChat = await Chat.findById(chat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(fullChat);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📌 Pin chat
export const pinChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    if (!chat.pinnedBy.includes(req.user._id)) {
      chat.pinnedBy.push(req.user._id);
    }

    await chat.save();

    res.json(chat);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

import mongoose from "mongoose";

// JSON
export const exportChat = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: new mongoose.Types.ObjectId(req.params.chatId)
    }).populate("sender", "name");

    res.json(messages);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// TEXT
export const exportChatText = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: new mongoose.Types.ObjectId(req.params.chatId)
    }).populate("sender", "name");

    if (!messages.length) {
      return res.send("No messages in this chat");
    }

    let chatText = "";

    messages.forEach(msg => {
      chatText += `${msg.sender?.name || "User"}: ${msg.content}\n`;
    });

    res.send(chatText);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// // 📤 Export chat JSON
// export const exportChat = async (req, res) => {
//   try {
//     const messages = await Message.find({
//       chat: req.params.chatId
//     }).populate("sender", "name");

//     res.json(messages);

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // 📤 Export chat TEXT
// export const exportChatText = async (req, res) => {
//   try {
//     const messages = await Message.find({
//       chat: req.params.chatId
//     }).populate("sender", "name");

//     let chatText = "";

//     messages.forEach(msg => {
//       chatText += `${msg.sender?.name || "User"}: ${msg.content}\n`;
//     });

//     res.send(chatText);

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };