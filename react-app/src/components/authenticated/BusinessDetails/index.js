import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";

// import ReactBnBGallery from "react-bnb-gallery";
// import "react-bnb-gallery/dist/style.css";

import phoneSvg from "../../../logo-images/phone-svg.svg";
import directionsSvg from "../../../logo-images/directions-svg.svg";
import websiteSvg from "../../../logo-images/website-svg.svg";

import {
  deleteBusinessThunk,
  getBusinessesThunk,
} from "../../../store/business";
import { loadReviewsThunk, deleteReviewThunk } from "../../../store/review";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "../mapStyles";

// Import components
import BusinessDetailsBanner from "./Banner";

import "./BusinessDetails.css";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyles,
};

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoObject, setPhotoObject] = useState([]);

  const user = useSelector((state) => state?.session?.user);

  const businesses = useSelector((state) => Object.values(state?.businesses));

  // console.log(businesses, "~~~~~~~~~~");
  // console.log(id);

  const reviews = useSelector((state) => Object.values(state.reviews));

  //   const businesses = useSelector((state) => state.businessState.entries);
  //   const reviews = useSelector((state) => state.reviewState.entries);

  const business = businesses.find((business) => business?.id === +id);

  console.log(business, "single business");

  // console.log(user?.id, "logged in user");
  // console.log(business?.user_id, "owner of the business user");

  const formatPhone = (number) => {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  let phone = "";

  if (business) {
    phone = formatPhone(business?.phone_number);
  }

  useEffect(() => {
    (async () => {
      await dispatch(getBusinessesThunk());
      await dispatch(loadReviewsThunk(id));
    })();
  }, [dispatch, id]);

  // functional but lacks confirmation modal
  const handleDeleteBusiness = async (e) => {
    e.preventDefault();

    await dispatch(deleteBusinessThunk(id));

    // add a modal to this, right now just deletes without any confirmation

    // add some alert/react toast
    alert("Business successfully deleted!");
    history.push("/");
  };

  // not tested
  const handleDeleteReview = async (e) => {
    e.preventDefault();

    let reviewToDeleteId = parseInt(e.target.id, 10);
    const payload = {
      reviewToDeleteId,
      businessId: id,
    };

    await dispatch(deleteReviewThunk(payload));
  };

  const handlePhotos = (photosIndex) => {
    if (!photoObject.length) {
      const businessImages = [];

      for (let i = 0; i < business?.images_business.length; i++) {
        businessImages.push({
          photo: business?.images_business[i],
          caption: business?.name,
        });
      }
      setPhotoObject(businessImages);
    }
    setPhotoIndex(photoIndex);
    setShowPhotoModal(true);
  };

  if (!business) {
    return <h1 className="roll-heading">Loading...</h1>;
  }

  return (
    <>
      <BusinessDetailsBanner business={business} reviews={reviews} />
      <div className="business-details-container">
        <div>
          <div className="crud-buttons">
            <Link
              className="action-button"
              // to={`this will open a modal or this page will have the comment box with no modal`}
            >
              Add a Review
            </Link>
            {user?.id === business?.user_id ? (
              <Link className="action-button" to={`/businesses/edit/${id}`}>
                Edit Business
              </Link>
            ) : (
              <></>
            )}
            {user?.id === business?.user_id ? (
              <button className="action-button" onClick={handleDeleteBusiness}>
                Delete Business
              </button>
            ) : (
              <></>
            )}
          </div>
          <h2 className="photos-h2">Photos</h2>
          <div className="images_container">
            {business?.images_business.map((image) => (
              <img
                className="images-in-the-container"
                key={image.id}
                src={image}
                alt={image.id}
                onClick={() => handlePhotos()}
              />
            ))}
          </div>
          {/* <ReactBnBGallery
            show={showPhotoModal}
            onClose={() => setShowPhotoModal(false)}
            photos={photoObject}
            activePhotoIndex={photoIndex}
          /> */}
          {/* put review component here */}
          {/* put review component here */}
          {/* put review component here */}
          {/* put review component here */}
          {/* put review component here */}
        </div>
        <div className="business-details-right">
          <div className="business-info-details">
            <div className="business-website-details-section">
              <h3 className="website-h3">Website</h3>
              <a href={business.website} target="_blank" rel="noreferrer">
                <span className="info_window_phone">
                  <img
                    src={websiteSvg}
                    style={{
                      width: "1.4em",
                      marginLeft: "1.1em",
                      marginRight: "1.1em",
                    }}
                    className="phone-svg"
                    alt="star-icon"
                  ></img>
                  <span className="number-phone-svg">{business.website}</span>
                </span>
              </a>
            </div>
            {phone ? (
              <div className="business-phone-details-section">
                <h3 className="website-h3">Contact</h3>
                <span className="info_window_phone">
                  <img
                    src={phoneSvg}
                    style={{
                      width: "1.4em",
                      marginLeft: "1.1em",
                      marginRight: "1.1em",
                    }}
                    className="phone-svg"
                    alt="star-icon"
                  ></img>
                  <span className="number-phone-svg">{phone}</span>
                </span>
              </div>
            ) : (
              <></>
            )}
            <div className="business-address-details-section">
              <h3 className="website-h3">Get Directions</h3>
              <Link to={`/directions/${business?.id}`}>
                <span className="info_window_phone">
                  <img
                    src={directionsSvg}
                    style={{
                      width: "1.4em",
                      marginLeft: "1.1em",
                      marginRight: "1.1em",
                    }}
                    className="directions-svg"
                    alt="star-icon"
                  ></img>
                  <span className="number-directions-svg">
                    {business?.address}
                  </span>
                </span>
              </Link>
            </div>
          </div>
          {/* <div className="business-map">
            <div className="search-spot-map">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{
                  lat: 40.09005801617348,
                  lng: -100.66383032528964,
                }}
                options={options}
              ></GoogleMap>
            </div>
          </div>

          ^ not working fix later

          */}
        </div>
      </div>
    </>
  );
};

export default BusinessDetails;
