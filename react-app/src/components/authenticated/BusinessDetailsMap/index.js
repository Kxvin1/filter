import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { getBusinessesThunk } from "../../../store/business";
import { getKey } from "../../../store/key";

import "./BusinessDetailsMap.css";

const BusinessMap = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const businesses = useSelector((state) => Object.values(state.businesses));
  const business = businesses.find((business) => business.id === +id);
  const key = useSelector((state) => state.map.key);

  useEffect(() => {
    dispatch(getBusinessesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  return (
    <iframe
      loading="lazy"
      className="embed-map"
      title="location-map"
      src={`https://www.google.com/maps/embed/v1/place?key=${key}
            &q=${business["address"]},${business["city"]}+${business["state"]}`}
    ></iframe>
  );
};

export default BusinessMap;
