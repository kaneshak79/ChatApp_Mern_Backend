// // // // // // import multer from "multer";
// // // // // // import { CloudinaryStorage } from "multer-storage-cloudinary";
// // // // // // import cloudinary from "../config/cloudinary.js";

// // // // // // const storage = new CloudinaryStorage({
// // // // // //   cloudinary,
// // // // // //   params: {
// // // // // //     folder: "chat-app",
// // // // // //     resource_type: "auto"
// // // // // //   }
// // // // // // });

// // // // // // const upload = multer({ storage });

// // // // // // export default upload;


// // // // // import multer from "multer";
// // // // // import { CloudinaryStorage } from "multer-storage-cloudinary";
// // // // // import cloudinary from "../config/cloudinary.js";

// // // // // const storage = new CloudinaryStorage({
// // // // //   cloudinary,
// // // // //   params: async (req, file) => {
// // // // //     let folder = "chat-app";
// // // // //     let resource_type = "auto";

// // // // //     // detect type
// // // // //     if (file.mimetype.startsWith("image")) {
// // // // //       folder = "chat-app/images";
// // // // //     } else if (file.mimetype.startsWith("video")) {
// // // // //       folder = "chat-app/videos";
// // // // //     } else if (file.mimetype.startsWith("audio")) {
// // // // //       folder = "chat-app/audio";
// // // // //     } else {
// // // // //       folder = "chat-app/files";
// // // // //     }

// // // // //     return {
// // // // //       folder,
// // // // //       resource_type,
// // // // //       public_id: Date.now() + "-" + file.originalname
// // // // //     };
// // // // //   }
// // // // // });

// // // // // // ✅ File filter (security)
// // // // // const fileFilter = (req, file, cb) => {
// // // // //   const allowed = [
// // // // //     "image/jpeg",
// // // // //     "image/png",
// // // // //     "image/webp",
// // // // //     "video/mp4",
// // // // //     "audio/mpeg",
// // // // //     "application/pdf"
// // // // //   ];

// // // // //   if (allowed.includes(file.mimetype)) {
// // // // //     cb(null, true);
// // // // //   } else {
// // // // //     cb(new Error("Invalid file type"), false);
// // // // //   }
// // // // // };

// // // // // // ✅ Limit size (20MB)
// // // // // const upload = multer({
// // // // //   storage,
// // // // //   fileFilter,
// // // // //   limits: { fileSize: 20 * 1024 * 1024 }
// // // // // });

// // // // // export default upload;




// // import multer from "multer";
// // import { CloudinaryStorage } from "multer-storage-cloudinary";
// // import cloudinary from "../config/cloudinary.js";

// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: async (req, file) => {
// //     let resourceType = "auto";

// //     // detect file type
// //     if (file.mimetype.startsWith("image")) {
// //       resourceType = "image";
// //     } else if (file.mimetype.startsWith("video")) {
// //       resourceType = "video";
// //     } else {
// //       resourceType = "raw"; // ✅ for pdf, docs
// //     }

// //     return {
// //       folder: "chat-app",
// //       resource_type: resourceType,
// //       public_id: Date.now() + "-" + file.originalname
// //     };
// //   }
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 20 * 1024 * 1024 } // 20MB
// // });

// // export default upload;


// // // import { CloudinaryStorage } from "multer-storage-cloudinary";
// // // import cloudinary from "../config/cloudinary.js";
// // // import multer from "multer";

// // // const storage = new CloudinaryStorage({
// // //   cloudinary,
// // //   params: {
// // //     folder: "chat-app",
// // //     resource_type: "auto",
// // //     allowed_formats: ["jpg", "jpeg", "png", "pdf", "mp4"],
// // //     upload_preset: "chat_app" // Add the preset name here
// // //   }
// // // });


// // // const upload=multer({ storage });

// // // export default upload;



// // middleware/upload.js
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     let resourceType = "raw"; // default for PDFs, Word, audio, etc.

//     if (file.mimetype.startsWith("image")) resourceType = "image";
//     else if (file.mimetype.startsWith("video")) resourceType = "video";
//     else if (file.mimetype.startsWith("audio")) resourceType = "video"; // Cloudinary treats audio as video

//     return {
//       folder: "chat-app",
//       resource_type: resourceType,
//       public_id: Date.now() + "-" + file.originalname,
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
// });

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