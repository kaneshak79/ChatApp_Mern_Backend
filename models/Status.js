// import mongoose from "mongoose";

// const statusSchema = new mongoose.Schema({
//   // 👤 owner
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },

//   // 📂 media
//   type: {
//     type: String,
//     enum: ["text", "image", "video", "file"],
//     default: "text"
//   },

//   content: {
//     type: String,
//     default: ""
//   },

//   mediaUrl: {
//     type: String,
//     default: ""
//   },

//   // 👁️ viewers
//   viewers: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//     }
//   ],

//   // ⏳ auto delete (24 hrs)
//   expiresAt: {
//     type: Date,
//     default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
//   }

// }, { timestamps: true });

// // ⏳ auto remove after 24 hrs
// statusSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// export default mongoose.model("Status", statusSchema);


import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    // 👤 owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📂 media type
    type: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "image", // ✅ FIX (most of your statuses are images)
    },

    content: {
      type: String,
      default: "",
    },

    mediaUrl: {
      type: String,
      required: true, // ✅ FIX (no more empty "" or "url")
    },

    // 👁️ viewers
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ⏳ auto delete (24 hrs)
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

// ⏳ TTL index (auto delete)
statusSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Status", statusSchema);