// // // import Notification from "../models/Notification.js";

// // // const createNotification = async (sender, receiver, messageId) => {
// // //   try {
// // //     await Notification.create({
// // //       sender,
// // //       receiver,
// // //       type: "message",
// // //       message: messageId
// // //     });
// // //   } catch (err) {
// // //     console.error("Notification error:", err.message);
// // //   }
// // // };

// // // export default createNotification;

// // import Notification from "../models/Notification.js";

// // const createNotification = async ({
// //   sender,
// //   receiver,
// //   type = "message",
// //   message = null
// // }) => {
// //   try {
// //     await Notification.create({
// //       sender,
// //       receiver,
// //       type,
// //       message
// //     });
// //   } catch (err) {
// //     console.error("Notification error:", err.message);
// //   }
// // };

// // export default createNotification;


// import Notification from "../models/Notification.js";

// const createNotification = async ({
//   sender,
//   receiver,
//   type = "message",
//   message = null
// }) => {
//   try {
//     await Notification.create({
//       sender,
//       user: receiver, // ✅ important
//       type,
//       message
//     });
//   } catch (err) {
//     console.error("Notification error:", err.message);
//   }
// };

// export default createNotification;

import Notification from "../models/Notification.js";

const createNotification = async ({
  sender,
  receiver,
  type = "message",
  message = null
}) => {
  try {
    console.log("Creating notification:", sender, receiver); // 👈 ADD

    const notif = await Notification.create({
      sender,
      receiver,
      type,
      message
    });

    console.log("Saved notification:", notif); // 👈 ADD

  } catch (err) {
    console.error("Notification error:", err.message);
  }
};

export default createNotification;