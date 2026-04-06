📡 Pingly — Backend API
🚀 WhatsApp-like Real-Time Chat System












📖 Overview

Pingly Backend is a scalable, real-time messaging API inspired by modern chat platforms like WhatsApp.
It supports direct messaging, group communication, media sharing, status updates, and call signaling, all powered by a modular and maintainable architecture.

✨ Features
🔐 Authentication
Secure JWT-based login system
User registration & login
Forgot password / reset password flow
Protected API routes
💬 Chat System
👤 1-on-1 Chat
Auto create or fetch chat
Real-time messaging
Sender ↔ receiver sync
👥 Group Chat
Create group with multiple users
Dynamic group naming
View group members
Click member → view profile
✉️ Messaging Capabilities
Send messages:
Text, Images, Videos, PDFs, Files
Edit messages
Delete:
For me
For everyone
Copy messages
Translate messages
Delivery states:
Sent ✔
Delivered ✔✔
Seen ✔✔ (blue)
Unread message count
📞 Calling
Audio call support
Video call support
Socket-based signaling
📸 Status (Stories)
Create status (text/media)
View others’ statuses
Edit/delete own status
Separate "My Status" & "Others"
🔔 Notifications
Real-time notifications
Event-driven updates
🏗️ Architecture
Client → Routes → Controllers → Models → Database
                ↘ Socket Layer (Realtime)
Clean separation of concerns
Scalable and maintainable structure
Easily extendable
📁 Folder Structure
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── uploads/
│
├── socket.js
├── server.js
├── .env
└── package.json
⚙️ Tech Stack
Layer	Tech
Backend	Node.js
Framework	Express.js
Database	MongoDB (Mongoose)
Realtime	Socket.IO
Auth	JWT
File Upload	Multer
Media Store	Cloudinary
🔌 API Highlights
Chat
POST /api/chat → Create/Get 1-on-1 chat
GET /api/chat/group/:id → Get group chat
Message
Send, edit, delete, translate messages
Track delivered & seen status
Status
Create / update / delete / view
🔄 Real-Time System

Powered by Socket.IO:

Instant messaging
Notifications
Call signaling
🔐 Environment Setup

Create .env:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
▶️ Run Locally
npm install
npm run dev
📊 Database Design (Concept)
User → Chats → Messages
     → Status
     → Notifications
🚀 Highlights
WhatsApp-level feature set
Real-time architecture
Modular backend design
Media + translation support
Clean and scalable codebase
👨‍💻 Author

Kanesha K

⭐ Future Improvements
Typing indicators
Message reactions
End-to-end encryption
Read receipts analytics
