import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getBusinessesThunk } from "../../../store/business";

import "./Directions.css";

import Banner from "../Banner";

import mapStyles from "../mapStyles";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";

import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyles,
};

const libraries = ["places"];

export default function Directions({ apiKey }) {
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [center, setCenter] = useState({
    lat: 39.5,
    lng: -98.35,
  });

  useEffect(() => {
    window.scrollTo(2000, 2000);
  }, []);

  const [latitudeAvg, setLatitudeAvg] = useState(null);
  const [longitudeAvg, setLongitudeAvg] = useState(null);
  const [zoom, setZoom] = useState(4);

  const business = useSelector((state) => state.businesses[businessId]);

  useEffect(() => {
    dispatch(getBusinessesThunk());
  }, [dispatch, businessId]);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    // destinationRef.current.value = "";
  }

  async function getCoordinates() {
    const res = await getGeocode({ address: destinationRef.current.value });
    const { lat, lng } = await getLatLng(res[0]);
  }

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      {isLoaded && (
        <div>
          <Banner />
          <div className="main_content_directions">
            <div className="directions_input_container">
              <div>
                <div className="directions_main_container">
                  <div className="directions_distance_container">
                    <h2>
                      Distance to {`${business?.name}`}: {distance}
                    </h2>
                  </div>
                  <div className="directions_duration_container">
                    <h2>Drive Duration: {duration}</h2>
                  </div>
                  <div>
                    <Link to={`/businesses/${business?.id}`}>
                      Click to view {`${business?.name}'s`} business page!
                    </Link>
                  </div>
                </div>

                <div className="input_div">
                  <div className="origin_div">Origin: </div>
                  <Autocomplete>
                    <input ref={originRef}></input>
                  </Autocomplete>
                  <Autocomplete>
                    <input
                      ref={destinationRef}
                      value={business?.address}
                      className="directions_destination_input"
                    ></input>
                  </Autocomplete>
                </div>
                <div className="button_container">
                  <div>
                    <button
                      className="button_calculate"
                      onClick={(e) => {
                        calculateRoute();
                        getCoordinates();
                      }}
                    >
                      Calculate Driving Distance
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        clearRoute();
                      }}
                      className="button_clear"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", height: "85vh" }}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
                options={options}
              >
                {directionsResponse && (
                  <DirectionsRenderer
                    directions={directionsResponse}
                  ></DirectionsRenderer>
                )}
              </GoogleMap>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
