import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebase, { initializeApp } from "firebase/app";
import { getCookie, setCookie } from "cookies-next";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      const config = {
        apiKey: "AIzaSyB7eliIQzf-Zp9WoVH8R_zT1vYDaEn-7G4",
        authDomain: "yogi-76ea1.firebaseapp.com",
        projectId: "yogi-76ea1",
        storageBucket: "yogi-76ea1.appspot.com",
        messagingSenderId: "242445304021",
        appId: "1:242445304021:web:454ca6ecd2f06edcdda25c",
        measurementId: "G-JM740ZBKJ7",
      };

      const app = initializeApp(config);

      try {
        const messaging = getMessaging(app);
        const tokenInLocalForage = await getCookie("fcm_token");

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await getToken(messaging, {
            vapidKey:
              "BK5-sJyYw0s9xdDGFTqLvQlIb4pPqk1NZom7hnIc7PlZzok9dUGXOFBhr6HZj-uq6sVDaN962X487UZI0f8GfCw",
          });

          // Set token in our local storage
          if (fcm_token) {
            setCookie("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};

export { firebaseCloudMessaging };
