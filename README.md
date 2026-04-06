📡 Pingly Backend (WhatsApp-like Chat App)

A powerful real-time chat backend built with Node.js, Express, MongoDB, and Socket.io, supporting 1-on-1 messaging, group chats, status updates, media sharing, and calling features — similar to WhatsApp.

🚀 Features
🔐 Authentication
User Registration & Login
JWT-based Authentication
Forgot Password & Reset Password
💬 Chat System
1-on-1 Chat
Create or fetch chat automatically
Send & receive messages in real-time
Group Chat
Create group with multiple users
View group members
Click member → view user details
✉️ Messaging Features
Send messages:
Text
Images
Videos
PDFs
Files
Edit message
Delete:
Delete for me
Delete for everyone
Copy message
Translate message
Message status:
Delivered
Seen
Unread message count
📞 Calling
Audio Call support
Video Call support
📸 Status Feature
Create status (text/media)
View others' status
Edit own status
Delete own status
🔔 Notifications
Real-time message notifications
📁 Folder Structure
backend/
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── controllers/
│   ├── authController.js
│   ├── chatController.js
│   ├── messageController.js
│   ├── statusController.js
│   ├── userController.js
│   ├── callController.js
│   └── notificationController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── upload.js
│
├── models/
│   ├── User.js
│   ├── Chat.js
│   ├── Message.js
│   ├── Status.js
│   ├── Notification.js
│   └── Call.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── chatRoutes.js
│   ├── messageRoutes.js
│   ├── statusRoutes.js
│   ├── notificationRoutes.js
│   ├── callRoutes.js
│   └── uploadRoutes.js
│
├── utils/
│   └── createNotification.js
│
├── uploads/
├── socket.js
├── server.js
├── .env
└── package.json
⚙️ Tech Stack
Node.js
Express.js
MongoDB + Mongoose
Socket.io (real-time communication)
Cloudinary (media uploads)
JWT Authentication
Multer (file uploads)
🔌 API Endpoints Overview
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
Users
GET /api/user/search
GET /api/user/:id
Chat
POST /api/chat → Create/Get 1-on-1 chat
GET /api/chat?userId= → Get existing chat
GET /api/chat/group/:id → Get group chat
POST /api/chat/group → Create group
Messages
POST /api/message/ → Send message
GET /api/message/:chatId → Get messages
PUT /api/message/edit/:id → Edit message
PUT /api/message/delete-me/:id → Delete for me
PUT /api/message/delete-everyone/:id → Delete for all
PUT /api/message/delivered/:id → Mark delivered
PUT /api/message/seen/:id → Mark seen
POST /api/message/translate → Translate message
GET /api/message/unread/:chatId → Unread count
Status
POST /api/status
GET /api/status
PUT /api/status/:id
DELETE /api/status/:id
Calls
POST /api/call/audio
POST /api/call/video
Notifications
GET /api/notification
PUT /api/notification/read
🔑 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
▶️ Running the Project
# Install dependencies
npm install

# Run server
npm run dev
📡 Real-Time (Socket.io)
Handles:
Live messaging
Notifications
Call signaling
📌 Key Highlights
WhatsApp-like full chat system
Clean modular architecture
Supports both 1-on-1 and group chats
Media + translation support
Real-time updates with Socket.io
👨‍💻 Author

Kanesha K
