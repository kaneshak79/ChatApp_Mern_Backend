// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";

// import connectDB from "./config/db.js";
// import initSocket from "./socket.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import statusRoutes from "./routes/statusRoutes.js";
// import callRoutes from "./routes/callRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import path from "path";

// dotenv.config();

// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static("uploads"));
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/status", statusRoutes);
// app.use("/api/call", callRoutes);
// app.use("/api/notifications", notificationRoutes);
// const server = http.createServer(app);

// initSocket(server);

// server.listen(5000, () => console.log("Server running on port 5000"));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import connectDB from "./config/db.js";
import initSocket from "./socket.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import callRoutes from "./routes/callRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

connectDB();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*"
}));
app.use(express.json());

// ✅ Static (only if using local uploads)
app.use("/uploads", express.static("uploads"));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/call", callRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ Error handler (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: err.message || "Server Error" });
});

// ✅ Server + Socket
const server = http.createServer(app);
initSocket(server);

// ✅ Dynamic port
const PORT = process.env.PORT || 5000;
console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET);
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);