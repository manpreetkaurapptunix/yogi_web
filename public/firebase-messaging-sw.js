importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyB7eliIQzf-Zp9WoVH8R_zT1vYDaEn-7G4",
  authDomain: "yogi-76ea1.firebaseapp.com",
  projectId: "yogi-76ea1",
  storageBucket: "yogi-76ea1.appspot.com",
  messagingSenderId: "242445304021",
  appId: "1:242445304021:web:454ca6ecd2f06edcdda25c",
  measurementId: "G-JM740ZBKJ7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
