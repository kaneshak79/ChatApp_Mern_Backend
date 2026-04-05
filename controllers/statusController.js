// import Status from "../models/Status.js";

// // ➕ Create status
// export const createStatus = async (req, res) => {
//   try {
//     const { type, content, mediaUrl } = req.body;

//     const status = await Status.create({
//       user: req.user._id,
//       type,
//       content,
//       mediaUrl
//     });

//     res.json(status);

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // 📥 Get all statuses (friends / all users)
// export const getStatuses = async (req, res) => {
//   try {
//     const statuses = await Status.find({
//       user: { $ne: req.user._id }
//     })
//       .populate("user", "name profilePic")
//       .sort({ createdAt: -1 });

//     res.json(statuses);

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // 👁️ View status
// export const viewStatus = async (req, res) => {
//   try {
//     const status = await Status.findById(req.params.id);

//     if (!status) {
//       return res.status(404).json({ msg: "Status not found" });
//     }

//     if (!status.viewers.includes(req.user._id)) {
//       status.viewers.push(req.user._id);
//       await status.save();
//     }

//     res.json(status);

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ❌ Delete status
// export const deleteStatus = async (req, res) => {
//   try {
//     const status = await Status.findById(req.params.id);

//     if (!status) {
//       return res.status(404).json({ msg: "Status not found" });
//     }

//     if (status.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ msg: "Not allowed" });
//     }

//     await status.deleteOne();

//     res.json({ msg: "Status deleted" });

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };


import Status from "../models/Status.js";


// ➕ CREATE STATUS
export const createStatus = async (req, res) => {
  try {
    const { type, content, mediaUrl } = req.body;

    // ✅ VALIDATION
    if (!mediaUrl || !mediaUrl.startsWith("http")) {
      return res.status(400).json({ msg: "Invalid media URL" });
    }

    const status = await Status.create({
      user: req.user._id,
      type: type || "image",
      content: content || "",
      mediaUrl,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    });

    res.status(201).json(status);

  } catch (err) {
    console.error("CREATE STATUS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};



// 📥 GET ALL STATUSES (INCLUDING YOURS)
export const getStatuses = async (req, res) => {
  try {
    const now = new Date();

    const statuses = await Status.find({
      expiresAt: { $gt: now }, // ✅ only active statuses
    })
      .populate("user", "name profilePic")
      .sort({ createdAt: -1 });

    res.json(statuses);

  } catch (err) {
    console.error("GET STATUS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};



// 🔍 GET SINGLE STATUS
export const getSingleStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id)
      .populate("user", "name profilePic");

    if (!status) {
      return res.status(404).json({ msg: "Status not found" });
    }

    res.json(status);

  } catch (err) {
    console.error("GET SINGLE STATUS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};



// 👁️ VIEW STATUS (ADD VIEWER)
export const viewStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (!status) {
      return res.status(404).json({ msg: "Status not found" });
    }

    // ✅ add viewer only once
    if (!status.viewers.includes(req.user._id)) {
      status.viewers.push(req.user._id);
      await status.save();
    }

    res.json(status);

  } catch (err) {
    console.error("VIEW STATUS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};



// ✏️ UPDATE STATUS (OPTIONAL)
export const updateStatus = async (req, res) => {
  try {
    const { mediaUrl, content } = req.body;

    const status = await Status.findById(req.params.id);

    if (!status) {
      return res.status(404).json({ msg: "Status not found" });
    }

    if (status.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    if (mediaUrl) {
      if (!mediaUrl.startsWith("http")) {
        return res.status(400).json({ msg: "Invalid media URL" });
      }
      status.mediaUrl = mediaUrl;
    }

    if (content !== undefined) {
      status.content = content;
    }

    await status.save();

    res.json(status);

  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};



// ❌ DELETE STATUS
export const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (!status) {
      return res.status(404).json({ msg: "Status not found" });
    }

    // ✅ only owner can delete
    if (status.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await status.deleteOne();

    res.json({ msg: "Status deleted ✅" });

  } catch (err) {
    console.error("DELETE STATUS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};