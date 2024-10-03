// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBdzQN4lyXIyTaia08QOhmMlJFH60tgwFw",
  authDomain: "koncierge-57828.firebaseapp.com",
  projectId: "koncierge-57828",
  storageBucket: "koncierge-57828.appspot.com",
  messagingSenderId: "716779991674",
  appId: "1:716779991674:web:fd6fd9361314580729c1c3",
  measurementId: "G-ELRPYFQTMZ",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
