import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKey } from "../../../store/key";

import Directions from "../Directions";

const MapContainer = () => {
  const dispatch = useDispatch();
  const key = useSelector((state) => state.map.key);

  useEffect(() => {
    window.scrollTo(2000, 2000);
  }, []);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) return null;

  return <Directions apiKey={key} />;
};

export default MapContainer;
