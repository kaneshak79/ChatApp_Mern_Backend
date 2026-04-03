// // // // // // // // routes/uploadRoutes.js
// // // // // // // import express from "express";
// // // // // // // import upload from "../middleware/upload.js";
// // // // // // // import protect from "../middleware/authMiddleware.js";

// // // // // // // const router = express.Router();

// // // // // // // router.post("/", protect, upload.single("file"), (req, res) => {
// // // // // // //   res.json({ url: req.file.path });
// // // // // // // });

// // // // // // // export default router;


// // // // // // import express from "express";
// // // // // // import upload from "../middleware/upload.js";
// // // // // // import protect from "../middleware/authMiddleware.js";

// // // // // // const router = express.Router();

// // // // // // router.post("/", protect, upload.single("file"), (req, res) => {
// // // // // //   if (!req.file) {
// // // // // //     return res.status(400).json({ msg: "No file uploaded" });
// // // // // //   }

// // // // // //   const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;

// // // // // //   res.json({ url });
// // // // // // });

// // // // // // export default router;

// // // // // import express from "express";
// // // // // import upload from "../middleware/upload.js";
// // // // // import protect from "../middleware/authMiddleware.js";

// // // // // const router = express.Router();

// // // // // router.post("/", protect, upload.single("file"), (req, res) => {
// // // // //   if (!req.file) {
// // // // //     return res.status(400).json({ msg: "No file uploaded" });
// // // // //   }

// // // // //   // For Cloudinary, req.file.path is already the full URL
// // // // //   res.json({ url: req.file.path });
// // // // // });

// // // // // export default router;


// // // // // routes/uploadRoutes.js
// // // // import express from "express";
// // // // import multer from "multer";
// // // // import cloudinary from "../config/cloudinary.js";

// // // // const router = express.Router();
// // // // const upload = multer({ dest: "uploads/" }); // temporary storage on server

// // // // router.post("/upload", upload.single("file"), async (req, res) => {
// // // //   try {
// // // //     if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

// // // //     const result = await cloudinary.uploader.upload(req.file.path, {
// // // //       folder: "chat-app",
// // // //       resource_type: "auto", // works for images, videos, audio, pdf, etc.
// // // //     });

// // // //     res.status(200).json({
// // // //       msg: "File uploaded successfully",
// // // //       url: result.secure_url, // this is the link you can send in chat
// // // //     });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // export default router;


// // // import express from "express";
// // // import upload from "../middleware/upload.js"; // your cloudinary multer middleware

// // // const router = express.Router();

// // // router.post("/upload", upload.single("file"), async (req, res) => {
// // //   try {
// // //     if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

// // //     // multer-storage-cloudinary automatically returns the Cloudinary info in req.file
// // //     res.status(200).json({
// // //       msg: "File uploaded successfully",
// // //       url: req.file.path, // secure Cloudinary URL
// // //       type: req.file.mimetype,
// // //       name: req.file.originalname,
// // //     });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // export default router;


// // // routes/uploadRoutes.js
// // import express from "express";
// // import upload from "../middleware/upload.js";

// // const router = express.Router();

// // router.post("/upload", upload.single("file"), async (req, res) => {
// //   try {
// //     if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

// //     res.status(200).json({
// //       msg: "File uploaded successfully",
// //       url: req.file.path,       // Cloudinary URL
// //       type: req.file.mimetype,
// //       name: req.file.originalname,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // export default router;

// import express from "express";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// router.post("/", upload.single("file"), (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

//     res.status(200).json({
//       msg: "File uploaded successfully",
//       url: req.file.path,
//       type: req.file.mimetype,
//       name: req.file.originalname,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

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