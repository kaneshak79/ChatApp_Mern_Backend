import Status from "../models/Status.js";

// ➕ Create status
export const createStatus = async (req, res) => {
  try {
    const { type, content, mediaUrl } = req.body;

    const status = await Status.create({
      user: req.user._id,
      type,
      content,
      mediaUrl
    });

    res.json(status);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📥 Get all statuses (friends / all users)
export const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find({
      user: { $ne: req.user._id }
    })
      .populate("user", "name profilePic")
      .sort({ createdAt: -1 });

    res.json(statuses);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 👁️ View status
export const viewStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (!status) {
      return res.status(404).json({ msg: "Status not found" });
    }

    if (!status.viewers.includes(req.user._id)) {
      status.viewers.push(req.user._id);
      await status.save();
    }

    res.json(status);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ Delete status
export const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (!status) {
      return res.status(404).json({ msg: "Status not found" });
    }

    if (status.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await status.deleteOne();

    res.json({ msg: "Status deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};