import admin from "firebase-admin";
import { readFile } from "fs/promises";
// import  firebase from "../config/firebase/firebase_config.json";
let firebase_config = await loadConfig();

async function loadConfig() {
  try {
    const fileUrl = new URL('../config/firebase/firebase_config.json', import.meta.url);
    const json = JSON.parse(await readFile(fileUrl, { encoding: 'utf8' }));
    // console.log(json);
    return json; // Return the config object
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return null; // Handle the error appropriately
  }
}
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebase_config),
});

//  Send Push Notification
async function FirebasePushNotification(token, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return { success: true, message: "Notification sent successfully" };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: "Error sending notification",
      error: error,
    };
  }
}

// API Endpoint to send push notifications
export const sendNotification = async (req, res) => {
  const { token, title, body } = req.body;
  console.log({token,title,body})
  if (!token || !title || !body) {
    return res.status(400).json({
      success: false,
      message: "Missing token, title, or body in request",
    });
  }

  const result = await FirebasePushNotification(token, title, body);

  if (result.success) {
    res.status(200).json({ success: true, message: result.message });
  } else {
    res
      .status(500)
      .json({ success: false, message: result.message, error: result.error });
  }
};
