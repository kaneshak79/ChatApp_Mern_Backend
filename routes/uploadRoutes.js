

// export default router;


import express from "express";
import upload, { uploadToCloudinary } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Upload to Cloudinary signed
    const result = await uploadToCloudinary(req.file);

    res.status(200).json({
      msg: "File uploaded successfully",
      url: result.secure_url,
      type: req.file.mimetype,
      name: req.file.originalname,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
