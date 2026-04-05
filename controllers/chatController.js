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


// import Chat from "../models/Chat.js";

// GET all groups for logged-in user
export const getGroups = async (req, res) => {
  try {
    const groups = await Chat.find({
      isGroupChat: true,
      users: { $in: [req.user._id] },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 }); // latest first

    res.json(groups);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete group
export const deleteGroup = async (req, res) => {
  try {
    const group = await Chat.findById(req.params.groupId);

    if (!group) return res.status(404).json({ msg: "Group not found" });

    // Only admin can delete
    if (group.groupAdmin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Only admin can delete group" });
    }

    await Chat.findByIdAndDelete(req.params.groupId);

    res.json({ msg: "Group deleted ✅" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update group
export const updateGroup = async (req, res) => {
  try {
    const { name, users } = req.body;
    const group = await Chat.findById(req.params.groupId);

    if (!group) return res.status(404).json({ msg: "Group not found" });

    // Only admin can edit
    if (group.groupAdmin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Only admin can edit group" });
    }

    if (name) group.chatName = name;
    if (users) group.users = [...users, group.groupAdmin]; // keep admin

    await group.save();

    const updatedGroup = await Chat.findById(group._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(updatedGroup);
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