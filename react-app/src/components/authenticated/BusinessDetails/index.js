import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";

// import ReactBnBGallery from "react-bnb-gallery";
// import "react-bnb-gallery/dist/style.css";

import phoneSvg from "../../../logo-images/phone-svg.svg";
import directionsSvg from "../../../logo-images/directions-svg.svg";
import websiteSvg from "../../../logo-images/website-svg.svg";
import starSvg from "../../../logo-images/star-svg.svg";

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
import Reviews from "../Reviews/Reviews";

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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  if (!business) {
    return <h1 className="roll-heading">Loading...</h1>;
  }
  const root = document.documentElement;

  const scrollToBottom = () => {
    root.scrollTo(100000, 1000000);
  };

  return (
    <>
      <BusinessDetailsBanner business={business} reviews={reviews} />
      <div className="business-details-container">
        <div>
          <div className="crud-buttons">
            {/* <Link className="action-button" onClick={() => scrollToBottom()}>
              Write a Review
            </Link> */}

            {/* start test area */}

            <Link
              onClick={() => scrollToBottom()}
              class=" css-4ut3yi"
              data-activated="false"
              data-button="true"
            >
              <div class=" css-110vchp border-color--default__09f24__NPAKY">
                <div class=" css-0 padding-r1__09f24__ibKww border-color--default__09f24__NPAKY">
                  <span
                    alt=""
                    aria-hidden="true"
                    role="img"
                    class="icon--24-star-v2 css-tza3mu"
                  >
                    <svg width="24" height="24" class="icon_svg">
                      <path d="M17.87 22a.93.93 0 01-.46-.12L12 19.08l-5.41 2.84a1 1 0 01-1-.08 1 1 0 01-.4-1l1-6-4.39-4.26a1 1 0 01.56-1.7L8.4 8l2.7-5.48a1 1 0 011.8 0L15.6 8l6 .88a1 1 0 01.56 1.7l-4.38 4.27 1 6a1 1 0 01-1 1.17l.09-.02zM12 17c.163.002.323.04.47.11l4.07 2.15-.78-4.54a1 1 0 01.29-.89l3.3-3.21-4.56-.72a1 1 0 01-.79-.54l-2-4.14-2 4.14a1 1 0 01-.75.54l-4.56.67L8 13.78a1 1 0 01.29.89l-.78 4.54 4.07-2.15A1.12 1.12 0 0112 17z"></path>
                    </svg>
                  </span>
                </div>
                <div class=" css-0 border-color--default__09f24__NPAKY">
                  <span class="css-1enow5j" data-font-weight="semibold">
                    Write a review
                  </span>
                </div>
              </div>
            </Link>

            {/* end test area */}

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
          <div className="photos-title-container">
            <h2 className="photos-h2">Photos</h2>
          </div>
          <div className="images_container">
            {business?.images_business.map((image) => (
              <img
                className="images-in-the-container"
                key={image.id}
                src={image}
                alt={image.id}
                onClick={() => {
                  openInNewTab(image);
                }}
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
          <Reviews businessId={business.id} reviews={reviews} user={user} />
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
