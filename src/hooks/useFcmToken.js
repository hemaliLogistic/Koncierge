import { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "../utils/Firebase/firebase";

const useFcmToken = () => {
    const [token, setToken] = useState("");
    const [notificationPermissionStatus, setNotificationPermissionStatus] =
        useState("");

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (typeof window !== "undefined" && "serviceWorker" in navigator) {
                    const messaging = getMessaging(firebaseApp);

                    // Retrieve the notification permission status
                    const permission = await Notification.requestPermission();
                    setNotificationPermissionStatus(permission);

                    // Check if permission is granted before retrieving the token
                    if (permission === "granted") {
                        const currentToken = await getToken(messaging, {
                            vapidKey:
                                "BEdLronsxY2X01q1Qm7pgIjfhMJgHN9JfDBIakY1Kf4hCAchNK7UEGfL0Ytvc3AWpypJSA8n4udffEO6_jn7aYI",
                        });
                        if (currentToken) {
                            // console.log("currentToken", currentToken);

                            setToken(currentToken);
                        } else {
                            console.log(
                                "No registration token available. Request permission to generate one."
                            );
                        }
                    }
                }
            } catch (error) {
                console.log("An error occurred while retrieving token:", error);
            }
        };

        retrieveToken();
    }, []);
    useEffect(() => {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log("foreground push notification received:", payload);
                // Handle the received push notification while the app is in the background
                const notificationTitle = payload.notification.title;
                const notificationOptions = {
                    body: payload.notification.body,
                    icon: "/images/logo.png", // Replace with your logo URL
                };
                new Notification(notificationTitle, notificationOptions);
            });
            return () => {
                unsubscribe(); // Unsubscribe from the onMessage event
            };
        }
    }, [token]);

    return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
