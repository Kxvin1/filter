import React, { useState } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import mapStyles from "../mapStyles";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyles,
};

// re-write this so it loads directions component? or edit directions component directly and pass it in to MapContainer/index.js

const libraries = ["places"];
const Maps = ({ apiKey }) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });
  return <>{isLoaded && <Map />}</>;
};

export default function Map() {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      //   center={center}
      //   zoom={zoom}
      options={options}
    ></GoogleMap>
  );
}
