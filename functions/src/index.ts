import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendNotificationOnMessage = functions.firestore
  .document("chats/{chatId}/messages/{messageId}")
  .onCreate(async (snapshot) => {
    try {
      const messageData = snapshot.data();
      const sendBy = messageData.sendBy;
      const sendTo = messageData.sendTo;
      const messageText = messageData.text;

      console.log("Message Data:", { sendBy, sendTo, messageText });

      // Get receiver's user data
      const receiverDoc = await admin.firestore()
        .collection("users")
        .doc(sendTo)
        .get();

      if (!receiverDoc.exists) {
        console.log("Receiver document not found");
        return;
      }

      const receiverData = receiverDoc.data();
      const fcmToken = receiverData?.fcmToken;

      if (!fcmToken) {
        console.log("No FCM token found for receiver");
        return;
      }

      // Get sender's name
      const senderDoc = await admin.firestore()
        .collection("users")
        .doc(sendBy)
        .get();

      const senderName = senderDoc.data()?.userName || "Someone";

      // Send notification
      const message = {
        token: fcmToken,
        notification: {
          title: senderName,
          body: messageText,
        },
        data: {
          type: "chat",
          senderId: sendBy,
          receiverId: sendTo,
          screen: "CHAT",
        },
        android: {
          priority: "high",
          notification: {
            channelId: "default",
            clickAction: "FLUTTER_NOTIFICATION_CLICK",
          },
        },
        apns: {
          payload: {
            aps: {
              contentAvailable: true,
              badge: 1,
              sound: "default",
            },
          },
        },
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });
