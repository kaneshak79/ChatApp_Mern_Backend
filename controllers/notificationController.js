import Notification from "../models/Notification.js";

// 🔔 Get all notifications for logged user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user._id
    })
      .populate("sender", "name profilePic")
      .populate("message")
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✔ Mark single notification as read
export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);

    if (!notif) {
      return res.status(404).json({ msg: "Notification not found" });
    }

    notif.isRead = true;
    await notif.save();

    res.json(notif);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✔ Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { receiver: req.user._id },
      { isRead: true }
    );

    res.json({ msg: "All notifications marked as read" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ Delete notification
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({ msg: "Notification deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔢 Unread count
export const getUnreadNotifications = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      receiver: req.user._id,
      isRead: false
    });

    res.json({ unread: count });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};