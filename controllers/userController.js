import User from "../models/User.js";
import Chat from "../models/Chat.js";

// ✏️ Update profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.profilePic = req.body.profilePic || user.profilePic;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      bio: user.bio,
      profilePic: user.profilePic
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🚫 Block user
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.blockedUsers.includes(req.params.id)) {
      user.blockedUsers.push(req.params.id);
      await user.save();
    }

    res.json({ msg: "Blocked" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Unblock user
export const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.blockedUsers = user.blockedUsers.filter(
      id => id.toString() !== req.params.id
    );

    await user.save();

    res.json({ msg: "Unblocked" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔍 Search users
export const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    const users = await User.find({
      name: { $regex: keyword, $options: "i" }
    }).select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔍 Search chats
export const searchChats = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    const chats = await Chat.find({
      chatName: { $regex: keyword, $options: "i" }
    }).populate("users", "name");

    res.json(chats);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// GET /api/user/:id - Get details of a single user
// import User from "../models/User.js";

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email bio isOnline avatar");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
