import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getKey } from "../../../store/key";

import Maps from "./Map";

const MapContainer = () => {
  const dispatch = useDispatch();
  const key = useSelector((state) => state.map.key);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) return null;

  // instead of Maps, we'd render Directions component (might need apiKey prop so it loads)

  return <Maps apiKey={key} />;
};

export default MapContainer;
