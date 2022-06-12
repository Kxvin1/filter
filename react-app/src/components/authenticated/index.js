import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessesThunk } from "../../store/business";

import Banner from "./Banner";
import BusinessList from "./BusinessList";

import "./UserMain.css";

const UserHome = () => {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => Object.values(state?.businesses));

  useEffect(() => {
    dispatch(getBusinessesThunk());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  businesses.sort((a, b) => b.id - a.id); // newest appear at the top

  return (
    <>
      <Banner />
      <h1 className="list-heading">Your Next Review Awaits</h1>
      <div className="business-list">
        {businesses.map((business, idx) => (
          <BusinessList business={business} key={idx} />
        ))}
      </div>
    </>
  );
};

export default UserHome;
