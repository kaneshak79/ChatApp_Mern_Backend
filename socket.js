

// // import { Server } from "socket.io";

// // const onlineUsers = new Map();

// // const initSocket = (server) => {
// //   const io = new Server(server, {
// //     cors: { origin: "*" }
// //   });

// //   io.on("connection", (socket) => {

// //     // 🔵 USER ONLINE
// //     socket.on("setup", (userId) => {
// //       socket.join(userId);
// //       onlineUsers.set(userId, socket.id);

// //       io.emit("online users", Array.from(onlineUsers.keys()));
// //     });

// //     // 🔴 DISCONNECT
// //     socket.on("disconnect", () => {
// //       for (let [key, value] of onlineUsers) {
// //         if (value === socket.id) {
// //           onlineUsers.delete(key);
// //         }
// //       }
// //       io.emit("online users", Array.from(onlineUsers.keys()));
// //     });

// //     // 💬 JOIN CHAT
// //     socket.on("join chat", (chatId) => {
// //       socket.join(chatId);
// //     });

// //     // 📨 NEW MESSAGE
// //     socket.on("new message", (msg) => {
// //       socket.to(msg.chat).emit("message received", msg);
// //     });

// //     // ✔ DELIVERED
// //     socket.on("message delivered", ({ chatId, messageId }) => {
// //       socket.to(chatId).emit("message delivered", messageId);
// //     });

// //     // ✔✔ SEEN
// //     socket.on("message seen", ({ chatId, messageId }) => {
// //       socket.to(chatId).emit("message seen", messageId);
// //     });

// //     // ⌨️ TYPING
// //     socket.on("typing", (chatId) => {
// //       socket.to(chatId).emit("typing");
// //     });

// //     socket.on("stop typing", (chatId) => {
// //       socket.to(chatId).emit("stop typing");
// //     });

// //     // 📞 CALL USER
// //     socket.on("call user", ({ userToCall, signalData, from, name }) => {
// //       io.to(userToCall).emit("incoming call", {
// //         signalData,
// //         from,
// //         name
// //       });
// //     });

// //     // 📞 ACCEPT CALL
// //     socket.on("answer call", ({ to, signal }) => {
// //       io.to(to).emit("call accepted", signal);
// //     });

// //     // 📞 REJECT CALL
// //     socket.on("reject call", ({ to }) => {
// //       io.to(to).emit("call rejected");
// //     });

// //     // 📞 END CALL
// //     socket.on("end call", ({ to }) => {
// //       io.to(to).emit("call ended");
// //     });

// //     // 🔔 Send notification
// // socket.on("send notification", ({ to, notification }) => {
// //   io.to(to).emit("receive notification", notification);
// // });



// //   });
// // };

// // export default initSocket;


// import { Server } from "socket.io";

// const onlineUsers = new Map();

// const initSocket = (server) => {
//   const io = new Server(server, {
//     cors: { origin: "*" }
//   });

//   io.on("connection", (socket) => {

//     // 🔵 USER ONLINE
//     socket.on("setup", (userId) => {
//       socket.join(userId);
//       onlineUsers.set(userId, socket.id);

//       io.emit("online users", Array.from(onlineUsers.keys()));
//     });

//     // 🔴 DISCONNECT
//     socket.on("disconnect", () => {
//       for (let [key, value] of onlineUsers) {
//         if (value === socket.id) {
//           onlineUsers.delete(key);
//         }
//       }
//       io.emit("online users", Array.from(onlineUsers.keys()));
//     });

//     // 💬 JOIN CHAT
//     socket.on("join chat", (chatId) => {
//       socket.join(chatId);
//     });

//     // 📨 NEW MESSAGE
//     socket.on("new message", (msg) => {
//       socket.to(msg.chat).emit("message received", msg);
//     });

//     // ✔ DELIVERED
//     socket.on("message delivered", ({ chatId, messageId }) => {
//       socket.to(chatId).emit("message delivered", messageId);
//     });

//     // ✔✔ SEEN
//     socket.on("message seen", ({ chatId, messageId }) => {
//       socket.to(chatId).emit("message seen", messageId);
//     });

//     // ⌨️ TYPING
//     socket.on("typing", (chatId) => {
//       socket.to(chatId).emit("typing");
//     });

//     socket.on("stop typing", (chatId) => {
//       socket.to(chatId).emit("stop typing");
//     });

//     // =========================
//     // 📞 ONE-TO-ONE CALL
//     // =========================

//     socket.on("call user", ({ userToCall, signalData, from, name }) => {
//       io.to(userToCall).emit("incoming call", {
//         signalData,
//         from,
//         name
//       });
//     });

//     socket.on("answer call", ({ to, signal }) => {
//       io.to(to).emit("call accepted", signal);
//     });

//     socket.on("reject call", ({ to }) => {
//       io.to(to).emit("call rejected");
//     });

//     socket.on("end call", ({ to }) => {
//       io.to(to).emit("call ended");
//     });

//     // =========================
//     // 👥 GROUP VIDEO CALL (ADD HERE)
//     // =========================

//     // Join group call room
//     socket.on("join call room", ({ roomId, userId }) => {
//       socket.join(roomId);

//       socket.to(roomId).emit("user joined call", {
//         userId,
//         socketId: socket.id
//       });
//     });

//     // Send WebRTC offer
//     socket.on("call offer", ({ to, offer, from }) => {
//       io.to(to).emit("call offer", { offer, from });
//     });

//     // Send answer
//     socket.on("call answer", ({ to, answer }) => {
//       io.to(to).emit("call answer", answer);
//     });

//     // ICE candidate
//     socket.on("ice candidate", ({ to, candidate }) => {
//       io.to(to).emit("ice candidate", candidate);
//     });

//     // Leave call
//     socket.on("leave call", ({ roomId, userId }) => {
//       socket.leave(roomId);
//       socket.to(roomId).emit("user left call", userId);
//     });

//     // =========================
//     // 🔔 NOTIFICATION
//     // =========================

//     socket.on("send notification", ({ to, notification }) => {
//       io.to(to).emit("receive notification", notification);
//     });

//   });
// };

// export default initSocket;


import { Server } from "socket.io";

const onlineUsers = new Map();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {

    // 🔵 USER ONLINE
    socket.on("setup", (userId) => {
      socket.join(userId);

      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }

      onlineUsers.get(userId).add(socket.id);

      io.emit("online users", Array.from(onlineUsers.keys()));
    });

    // 🔴 DISCONNECT
    socket.on("disconnect", () => {
      for (let [userId, sockets] of onlineUsers) {
        sockets.delete(socket.id);

        if (sockets.size === 0) {
          onlineUsers.delete(userId);
        }
      }

      io.emit("online users", Array.from(onlineUsers.keys()));
    });

    // 💬 JOIN CHAT
    socket.on("join chat", (chatId) => {
      if (chatId) socket.join(chatId);
    });

    // 📨 NEW MESSAGE
    socket.on("new message", (msg) => {
      if (!msg?.chat) return;
      socket.to(msg.chat).emit("message received", msg);
    });

    // ✔ DELIVERED
    socket.on("message delivered", ({ chatId, messageId }) => {
      if (!chatId || !messageId) return;
      socket.to(chatId).emit("message delivered", messageId);
    });

    // ✔✔ SEEN
    socket.on("message seen", ({ chatId, messageId }) => {
      if (!chatId || !messageId) return;
      socket.to(chatId).emit("message seen", messageId);
    });

    // ⌨️ TYPING
    socket.on("typing", (chatId) => {
      if (chatId) socket.to(chatId).emit("typing");
    });

    socket.on("stop typing", (chatId) => {
      if (chatId) socket.to(chatId).emit("stop typing");
    });

    // =========================
    // 📞 ONE-TO-ONE CALL
    // =========================

    socket.on("call user", ({ userToCall, signalData, from, name }) => {
      if (!userToCall) return;

      io.to(userToCall).emit("incoming call", {
        signalData,
        from,
        name
      });
    });

    socket.on("answer call", ({ to, signal }) => {
      if (to) io.to(to).emit("call accepted", signal);
    });

    socket.on("reject call", ({ to }) => {
      if (to) io.to(to).emit("call rejected");
    });

    socket.on("end call", ({ to }) => {
      if (to) io.to(to).emit("call ended");
    });

    // =========================
    // 👥 GROUP CALL
    // =========================

    socket.on("join call room", ({ roomId, userId }) => {
      if (!roomId) return;

      socket.join(roomId);

      socket.to(roomId).emit("user joined call", {
        userId,
        socketId: socket.id
      });
    });

    socket.on("call offer", ({ to, offer, from }) => {
      if (to) io.to(to).emit("call offer", { offer, from });
    });

    socket.on("call answer", ({ to, answer }) => {
      if (to) io.to(to).emit("call answer", answer);
    });

    socket.on("ice candidate", ({ to, candidate }) => {
      if (to) io.to(to).emit("ice candidate", candidate);
    });

    socket.on("leave call", ({ roomId, userId }) => {
      if (!roomId) return;

      socket.leave(roomId);
      socket.to(roomId).emit("user left call", userId);
    });

    // =========================
    // 🔔 NOTIFICATION
    // =========================

    socket.on("send notification", ({ to, notification }) => {
      if (to) {
        io.to(to).emit("receive notification", notification);
      }
    });

  });
};

export default initSocket;