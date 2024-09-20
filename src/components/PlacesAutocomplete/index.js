import React, { useEffect, useRef, useState } from "react";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

const libraries = ["places"];

PlacesAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  defaultAddress: PropTypes.string,
  handleAddressChange: PropTypes.func,
};
export default function PlacesAutocomplete({
  name,
  placeholder = "",
  className = "",
  defaultAddress = "",
  handleAddressChange,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAp_QU8lo2x8VdX45_pMASdiMGhBD4JsjM",
    libraries,
  });

  const searchBoxRef = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(defaultAddress);
  }, [defaultAddress]);

  useEffect(() => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places?.length > 0) {
        const place = places[0];
        setAddress(place.formatted_address);
      }
    }
  }, [searchBoxRef.current]);
  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places?.length > 0) {
      const place = places[0];
      setAddress(place.formatted_address);
      handleAddressChange(place.formatted_address);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <StandaloneSearchBox
        name={name}
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}>
        <input
          type='text'
          placeholder={placeholder}
          value={address}
          className={`${className}`}
          onChange={(e) => setAddress(e.target.value)}
        />
      </StandaloneSearchBox>
    </div>
  );
}
