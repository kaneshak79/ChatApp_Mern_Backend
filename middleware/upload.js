

// export default upload;
// middleware/upload.js
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const storage = multer.memoryStorage(); // files stay in memory
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB max

export const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    // Determine resource type
    const resourceType = file.mimetype.startsWith("image")
      ? "image"
      : file.mimetype.startsWith("video") || file.mimetype.startsWith("audio")
      ? "video"
      : "raw";

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "chat_app",          // your folder
        resource_type: resourceType, // image, video, raw
        public_id: Date.now() + "-" + file.originalname,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export default upload;
