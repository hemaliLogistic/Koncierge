import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkPermissions();
    //console.log("useEffect called", navigator);

    if ("geolocation" in navigator) {
      //console.log("Geolocation is supported.");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.log("Position obtained:", position);

          if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            //console.log("Location coordinates:", latitude, longitude);
            setLocation({ latitude, longitude });
          } else {
            //console.log("Position or position.coords is null.");
            setError("Failed to obtain location coordinates.");
          }
        },
        (error) => {
          console.error("Error obtaining position:", error);
          setError(error.message);
        },
        {
          enableHighAccuracy: true, // Optional: High accuracy mode
          timeout: 5000, // Optional: Set timeout for location request
          maximumAge: 0, // Optional: No caching of location
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const checkPermissions = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      //console.log("Permissions query result:", result);

      if (result.state === "denied") {
        setError("Geolocation permission denied");
      }
    } catch (err) {
      console.error("Error checking permissions:", err);
      setError("Error checking permissions");
    }
  };

  return (
    <LocationContext.Provider value={{ location, error }}>
      {children}
    </LocationContext.Provider>
  );
};
