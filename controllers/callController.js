import Call from "../models/Call.js";

// 📞 Start call
export const startCall = async (req, res) => {
  try {
    const { users, callType, isGroupCall } = req.body;

    if (!users || users.length === 0) {
      return res.status(400).json({ msg: "Users required" });
    }

    const call = await Call.create({
      users,
      caller: req.user._id,
      callType,
      isGroupCall,
      status: "ongoing"
    });

    res.json(call);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📞 End call
export const endCall = async (req, res) => {
  try {
    const call = await Call.findById(req.params.id);

    if (!call) {
      return res.status(404).json({ msg: "Call not found" });
    }

    call.status = "ended";
    call.endTime = new Date();

    call.duration = Math.floor(
      (call.endTime - call.startTime) / 1000
    );

    await call.save();

    res.json(call);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ Missed / rejected
export const updateCallStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["missed", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const call = await Call.findById(req.params.id);

    if (!call) {
      return res.status(404).json({ msg: "Call not found" });
    }

    call.status = status;

    await call.save();

    res.json(call);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📜 Get call history
export const getCallHistory = async (req, res) => {
  try {
    const calls = await Call.find({
      users: req.user._id
    })
      .populate("users", "name profilePic")
      .populate("caller", "name")
      .sort({ createdAt: -1 });

    res.json(calls);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};