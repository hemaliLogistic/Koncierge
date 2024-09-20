// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCgMQFn3u7eeCG_7faFwUxfnV7mKgbME88",
  authDomain: "koncierge-e212b.firebaseapp.com",
  projectId: "koncierge-e212b",
  storageBucket: "koncierge-e212b.appspot.com",
  messagingSenderId: "112911186056",
  appId: "1:112911186056:web:be662ba456c688027b473d",
  measurementId: "G-DQYJ1YPQ73",
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
