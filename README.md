# 📡 Pingly — Backend API
## 🚀 WhatsApp-like Real-Time Chat System

---

## 📖 Overview

**Pingly Backend** is a scalable, real-time messaging API inspired by modern chat applications like WhatsApp.

It supports:

- 1-on-1 messaging  
- Group chats  
- Media & file sharing  
- Status (stories)  
- Audio & video call signaling  
- Real-time updates  

Built with a **modular and maintainable architecture**.

---

## ✨ Features

### 🔐 Authentication
- JWT-based authentication  
- User registration & login  
- Forgot password / reset password  
- Protected routes  

---

### 💬 Chat System

#### 👤 1-on-1 Chat
- Auto create or fetch chat  
- Real-time messaging  
- Sender ↔ receiver sync  

#### 👥 Group Chat
- Create group with multiple users  
- Dynamic group naming  
- View group members  
- Click member → view user details  

---

### ✉️ Messaging Features
- Send messages:
  - Text  
  - Images  
  - Videos  
  - PDFs  
  - Files  
- Edit messages  
- Delete messages:
  - Delete for me  
  - Delete for everyone  
- Copy messages  
- Translate messages  

#### 📊 Message Status
- Sent ✔  
- Delivered ✔✔  
- Seen ✔✔  
- Unread message count  

---

### 📞 Calling
- Audio call support  
- Video call support  
- Socket-based signaling  

---

### 📸 Status (Stories)
- Create status (text/media)  
- View others’ statuses  
- Edit own status  
- Delete own status  
- Separate **"My Status"** and **"Others"**  

---

### 🔔 Notifications
- Real-time notifications  
- Event-driven updates  

---

Client → Routes → Controllers → Models → Database
↘ Socket Layer (Realtime)


- Clean separation of concerns  
- Scalable structure  
- Easy to extend  

---

## 📁 Folder Structure

backend/
│
├── config/

│ ├── db.js

│ └── cloudinary.js
│
├── controllers/

│ ├── authController.js

│ ├── userController.js

│ ├── chatController.js

│ ├── messageController.js

│ ├── statusController.js

│ ├── callController.js

│ └── notificationController.js
│
├── middleware/

│ ├── authMiddleware.js

│ └── upload.js
│
├── models/

│ ├── User.js

│ ├── Chat.js

│ ├── Message.js

│ ├── Status.js

│ ├── Notification.js

│ └── Call.js
│
├── routes/

│ ├── authRoutes.js

│ ├── userRoutes.js

│ ├── chatRoutes.js

│ ├── messageRoutes.js

│ ├── statusRoutes.js

│ ├── notificationRoutes.js

│ ├── callRoutes.js

│ └── uploadRoutes.js
│
├── utils/

│ └── createNotification.js
│
├── uploads/
│
├── socket.js

├── server.js

├── .env

└── package.json


---

## ⚙️ Tech Stack

| Layer       | Technology          |
|------------|--------------------|
| Backend     | Node.js            |
| Framework   | Express.js         |
| Database    | MongoDB (Mongoose) |
| Realtime    | Socket.IO          |
| Auth        | JWT                |
| File Upload | Multer             |
| Media Store | Cloudinary         |

---

## 🔌 API Highlights

### 🔐 Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/forgot-password

POST /api/auth/reset-password


### 👤 Users

GET /api/user/search

GET /api/user/:id


### 💬 Chat

POST /api/chat

GET /api/chat?userId=

GET /api/chat/group/:id

POST /api/chat/group


### ✉️ Messages

POST /api/message/

GET /api/message/:chatId

PUT /api/message/edit/:id

PUT /api/message/delete-me/:id

PUT /api/message/delete-everyone/:id

PUT /api/message/delivered/:id

PUT /api/message/seen/:id

POST /api/message/translate

GET /api/message/unread/:chatId


### 📸 Status

POST /api/status

GET /api/status

PUT /api/status/:id

DELETE /api/status/:id


### 📞 Calls

POST /api/call/audio

POST /api/call/video


---

## 🔄 Real-Time System

Powered by **Socket.IO**:

- Instant messaging  
- Notifications  
- Call signaling  

---

## 🔐 Environment Variables

Create a `.env` file:


PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx


---

## ▶️ Run Locally

```bash
npm install
npm run dev

## 📊 Database Flow

User → Chats → Messages
     → Status
     → Notifications
End-to-end encryption

# 🚀 Highlights

WhatsApp-like full backend system
Supports both 1-on-1 and group chats
Real-time architecture
Media + translation support
Clean modular design

# 👨‍💻 Author

Kanesha K

## 🏗️ Architecture
