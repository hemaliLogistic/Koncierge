// components/LocationDisplay.js
import { LocationContext } from "@/utils/Context/LocationContext";
import React, { useContext } from "react";
// import { LocationContext } from "./LocationContext";

const LocationDisplay = () => {
  const { location, error } = useContext(LocationContext);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!location) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default LocationDisplay;
