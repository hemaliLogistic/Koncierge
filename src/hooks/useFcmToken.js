import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/utils/Firebase/firebase";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          // Request notification permission first
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // If permission is granted, proceed to get the token
          if (permission === "granted") {
            // Register the service worker and wait until it's ready
            const registration = await navigator.serviceWorker.register(
              "/firebase-messaging-sw.js"
            );
            await navigator.serviceWorker.ready;

            const messaging = getMessaging(firebaseApp);

            // Get FCM token with the service worker registration
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BASZPVoSU2XZlr60lnhnCaHuZ5H3d4txJ-UDM1NGfzT2zs0R1TvTNse4YP_gkwaE5eBZGXXkDIly64dZUsumtbk",
              serviceWorkerRegistration: registration,
            });

            if (currentToken) {
              setToken(currentToken); // Set the token once retrieved
              console.log("FCM Token:", currentToken); // Optional: Log the token for debugging
            } else {
              console.warn(
                "No FCM token available. Please check if registration is successful."
              );
            }
          } else {
            console.warn("Notification permission was denied.");
          }
        }
      } catch (error) {
        console.error("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
