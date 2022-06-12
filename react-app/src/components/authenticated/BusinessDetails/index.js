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

  // not needed
  // const handleDeleteReview = async (e) => {
  //   e.preventDefault();

  //   let reviewToDeleteId = parseInt(e.target.id, 10);
  //   const payload = {
  //     reviewToDeleteId,
  //     businessId: id,
  //   };

  //   await dispatch(deleteReviewThunk(payload));
  // };

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
                src={image.url}
                alt={image.id}
                // onClick={() => {
                //   handlePhotos();
                // }}

                // ! Old version of onClick in this img element below that works (add back if react bnb fails)
                onClick={() => {
                  openInNewTab(image.url);
                }}
              />
            ))}
          </div>

          {/* REACT BNB GALLERY AREA */}

          {/* <ReactBnBGallery
            show={showPhotoModal}
            onClose={() => setShowPhotoModal(false)}
            photos={photoObject}
            activePhotoIndex={photoIndex}
          /> */}

          {/* REACT BNB GALLERY AREA */}

          {/* start test area */}

          <section
            class=" margin-t4__09f24__G0VVf padding-t4__09f24__Y6aGL border--top__09f24__exYYb border-color--default__09f24__NPAKY"
            aria-label="Amenities and More"
          >
            <div class=" arrange__09f24__LDfbs gutter-auto__09f24__W9jlL vertical-align-middle__09f24__zU9sE margin-b3__09f24__l9v5d border-color--default__09f24__NPAKY">
              <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                <h2 class="css-cfcjyn">Amenities and More</h2>
              </div>
            </div>
            <div class=" border-color--default__09f24__NPAKY">
              <div
                class=" border-color--default__09f24__NPAKY"
                role="region"
                aria-live="polite"
                id="expander-link-content-17ce30f0-b669-4d8e-b715-0e1a946dd47b"
              >
                <div class=" margin-b3__09f24__l9v5d border-color--default__09f24__NPAKY">
                  <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo layout-wrap__09f24__GEBlv layout-2-units__09f24__PsGVW border-color--default__09f24__NPAKY">
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-medical-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M15 22H9a1 1 0 01-1-1v-5H3a1 1 0 01-1-1V9a1 1 0 011-1h5V3a1 1 0 011-1h6a1 1 0 011 1v5h5a1 1 0 011 1v6a1 1 0 01-1 1h-5v5a1 1 0 01-1 1zm-5-2h4v-5a1 1 0 011-1h5v-4h-5a1 1 0 01-1-1V4h-4v5a1 1 0 01-1 1H4v4h5a1 1 0 011 1v5z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Health Score
                          </span>
                          <span
                            class="label-spacing-v2__09f24__RiEXv css-ux5mu6"
                            data-font-weight="bold"
                          >
                            PASS
                          </span>
                          <p class=" css-12i50in">Powered by Hazel Analytics</p>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-order-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M23.596 17a4.97 4.97 0 00-1.836-3.839L17.753 4.77a1.114 1.114 0 00-.464-.53.983.983 0 00-.432-.124c-.013 0-.023-.008-.036-.008h-4.843a1 1 0 000 2h1.656a3.534 3.534 0 00-.09 3.006l1.817 4.107A5.018 5.018 0 0013.703 16H9.748a2.537 2.537 0 01-1.488-2.107c0-1.486 1.971-1.895 2.05-1.91a1 1 0 00.815-.983V9a.998.998 0 00-1-1h-2.03V5a3.003 3.003 0 00-3-3H1.38a1 1 0 00-1 1v8a1 1 0 001 1h.28a6.56 6.56 0 00-1.115 5.203.99.99 0 00.807.77c0 .01-.005.017-.005.027a4.056 4.056 0 108.11 0h5.06a4.055 4.055 0 108.109 0l-.001-.006a.996.996 0 00.97-.994zM9.125 10v.249a3.987 3.987 0 00-2.865 3.644A3.909 3.909 0 006.86 16H2.405a4.571 4.571 0 011.621-3.646 1 1 0 00-.079-1.587L2.832 10h6.293zM2.38 4h2.715a1 1 0 011 1v3H2.832c-.153.007-.305.03-.452.072V4zM5.4 20.056A2.058 2.058 0 013.347 18h4.11a2.058 2.058 0 01-2.056 2.056zM21.425 16h-5.658a3.001 3.001 0 015.658 0zm-5.93-9.182c.175-.273.431-.484.732-.603l2.783 5.827c-.14-.012-.272-.042-.414-.042-.502.007-1 .09-1.477.248l-1.744-3.943a1.54 1.54 0 01.12-1.487zm3.076 13.238A2.058 2.058 0 0116.517 18h4.109a2.058 2.058 0 01-2.055 2.056z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Offers Delivery
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-shopping-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M22 7h-5.177l-1.16-4.33a1 1 0 10-1.931.518L14.752 7H9.228l1.021-3.812a1.002 1.002 0 00-1.096-1.254 1 1 0 00-.836.737L7.157 7H2a1 1 0 00-1 1v4a1 1 0 001 1h.88l1.318 6.588A3.006 3.006 0 007.14 22h9.72a3.006 3.006 0 002.942-2.411L21.12 13H22a1 1 0 001-1V8a.998.998 0 00-1-1zm-4.16 12.197a1.001 1.001 0 01-.98.803H7.14a1.001 1.001 0 01-.98-.804L4.92 13h14.16l-1.24 6.197zM21 11H3V9h3.621l-.056.209a1 1 0 101.932.518L8.692 9h6.596l.215.8a1 1 0 001.932-.517L17.359 9H21v2z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Offers Takeout
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-checkmark-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M9.46 17.52a1 1 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42l3.25 3.26 8.33-8.34a1.004 1.004 0 011.42 1.42l-9 9a1 1 0 01-.71.37z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Masks required
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-checkmark-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M9.46 17.52a1 1 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42l3.25 3.26 8.33-8.34a1.004 1.004 0 011.42 1.42l-9 9a1 1 0 01-.71.37z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Accepts Credit Cards
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-checkmark-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M9.46 17.52a1 1 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42l3.25 3.26 8.33-8.34a1.004 1.004 0 011.42 1.42l-9 9a1 1 0 01-.71.37z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Accepts Apple Pay
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-close-v2 css-xxqqxs"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M13.41 12l5.3-5.29a1.004 1.004 0 10-1.42-1.42L12 10.59l-5.29-5.3a1.004 1.004 0 00-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 000 1.42 1 1 0 001.42 0l5.29-5.3 5.29 5.3a1 1 0 001.42 0 1 1 0 000-1.42L13.41 12z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span class=" css-qyp8bo" data-font-weight="semibold">
                            Accepts Android Pay
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-outdoor-seating-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M7 22H3.516a1 1 0 01-.965-.737l-1.5-5.52a1 1 0 011.93-.525L4.28 20H7a1 1 0 010 2zm13.516 0H17a1 1 0 110-2h2.751l1.3-4.782a1 1 0 011.93.525l-1.5 5.52a1 1 0 01-.965.737zm1.975-13.985L12.477 2.126a1.001 1.001 0 00-1.015.001L1.477 8.016a1.001 1.001 0 00-.493.861v2.03a.999.999 0 00.465.845 7.202 7.202 0 003.859 1.114 7.143 7.143 0 003.36-.833 7.093 7.093 0 002.348.748V16H7a1 1 0 100 2h4.016v3.012a1 1 0 002 0V18H17a1 1 0 000-2h-3.984v-3.23a7.076 7.076 0 002.292-.738 7.21 7.21 0 007.212-.28.999.999 0 00.464-.845v-2.03a1 1 0 00-.493-.862zm-1.507 2.31a5.206 5.206 0 01-5.09-.262.823.823 0 00-.09-.051.998.998 0 00-1.044.025 5.113 5.113 0 01-5.546 0 1.122 1.122 0 00-1.14.025 5.21 5.21 0 01-5.09.262v-.876l8.987-5.3 9.013 5.301v.875z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Outdoor Seating
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-sound-on-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M11 22.12a2 2 0 01-1.56-.76L5.25 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2.25l4.21-4.4A2 2 0 0113 3.88v16.24a2 2 0 01-2 2zM3 9v6h2.68a1 1 0 01.72.31l4.6 4.82V3.88l-.06.12L6.4 8.69a1 1 0 01-.72.31H3zm13 12.16a1.011 1.011 0 01-.3-2 7.54 7.54 0 000-14.4 1.001 1.001 0 11.6-1.91 9.54 9.54 0 010 18.22 1 1 0 01-.3.09zm0-4.42a1 1 0 01-.56-1.83 3.49 3.49 0 000-5.82 1 1 0 01-.27-1.38 1 1 0 011.39-.27 5.48 5.48 0 010 9.12 1 1 0 01-.56.18z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Quiet
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-kids-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M20.92 17.16a.56.56 0 00-.05-.08L5.54 1.75A2.57 2.57 0 101.9 5.38l.74.74a1 1 0 001.41-1.41L3.31 4a.573.573 0 01.81-.81L7 6v7a4 4 0 00.83 2.42l-1 1A3.59 3.59 0 005.16 16a3.5 3.5 0 103.5 3.5 3.41 3.41 0 00-.43-1.65l1.18-1.18A4 4 0 0011 17h7l.46.46a3 3 0 102.5-.3h-.04zM5.16 21a1.5 1.5 0 111.06-2.56A1.51 1.51 0 015.16 21zM11 15a2 2 0 01-2-2V8l7 7h-5zm9 6a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Good For Kids
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-professional-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M22 6h-5V3a1 1 0 00-1-1H8a1 1 0 00-1 1v3H2a1 1 0 00-1 1v11a4 4 0 004 4h14a4 4 0 004-4V7a1 1 0 00-1-1zM9 4h6v2H9V4zM8 8h13v3H3V8h5zm2 5h4v2h-4v-2zm9 7H5a2 2 0 01-2-2v-5h5v3a1 1 0 001 1h6a1 1 0 001-1v-3h5v5a2 2 0 01-2 2z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Good for Working
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-parking-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M12 1a11 11 0 0111 11c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 20a9 9 0 100-18 9 9 0 000 18zm.5-14a3.5 3.5 0 010 7H11v2.5a1 1 0 01-2 0V8a1 1 0 011-1h2.5zm0 5a1.5 1.5 0 000-3H11v3h1.5z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Street Parking
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-wifi-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M13.41 18.39a2 2 0 11-2.827-2.83 2 2 0 012.827 2.83zM17 15.31a1 1 0 01-.71-.29 6 6 0 00-8.48 0 1.022 1.022 0 11-1.47-1.42 8 8 0 0111.32 0 1 1 0 01-.66 1.71zm2.54-2.59a1 1 0 01-.71-.29 9.66 9.66 0 00-13.66 0A1.008 1.008 0 113.75 11c4.564-4.538 11.936-4.538 16.5 0a1 1 0 010 1.42 1 1 0 01-.71.3zm2.17-2.67a1 1 0 01-.71-.29 12.72 12.72 0 00-18 0 1.004 1.004 0 11-1.42-1.42c5.758-5.747 15.082-5.747 20.84 0a1 1 0 01-.71 1.71z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Free Wi-Fi
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-wheelchair-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M22.83 16.64L21 13.9a2 2 0 00-1.67-.9H18v-2.89A3.11 3.11 0 0014.89 7H8V5.66A4.17 4.17 0 003.84 1.5a1 1 0 100 2A2.16 2.16 0 016 5.66v5.55A6 6 0 1012.61 15H16v4a2.38 2.38 0 00-.4.31 2 2 0 102.83 0A2.18 2.18 0 0018 19v-4h1.36l1.81 2.74a1 1 0 101.66-1.1zM7 21.12a4 4 0 110-8 4 4 0 010 8zM11.53 13a.66.66 0 00-.15 0A6 6 0 008 11.21V9h6.89c.613 0 1.11.497 1.11 1.11V13h-4.47z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Wheelchair Accessible
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-close-v2 css-xxqqxs"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M13.41 12l5.3-5.29a1.004 1.004 0 10-1.42-1.42L12 10.59l-5.29-5.3a1.004 1.004 0 00-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 000 1.42 1 1 0 001.42 0l5.29-5.3 5.29 5.3a1 1 0 001.42 0 1 1 0 000-1.42L13.41 12z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span class=" css-qyp8bo" data-font-weight="semibold">
                            Dogs Not Allowed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                      <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                          <span
                            alt=""
                            aria-hidden="true"
                            role="img"
                            class="icon--24-bicycle-v2 css-106vfgv"
                          >
                            <svg width="24" height="24" class="icon_svg">
                              <path d="M18.22 11.5h-.31l-2.07-7.6a2 2 0 00-1.92-1.4H12a1 1 0 100 2h1.91l1.14 4.17c-2.06.4-3.12 2-4.07 3.44-.34.54-.711 1.06-1.11 1.56a2.34 2.34 0 00-.25-.3L8.25 9a1 1 0 100-2h-3.5a1 1 0 100 2h1.4L7 11.67a4.92 4.92 0 00-1.22-.17 5 5 0 105 5 4.37 4.37 0 00-.09-.81 13.59 13.59 0 002-2.5c1-1.5 1.65-2.42 2.92-2.6l.4 1.47a5 5 0 102.24-.56h-.03zm-12.44 8A3 3 0 118.33 15a5.21 5.21 0 01-2.51.56 1 1 0 000 2A7.52 7.52 0 008.73 17a3 3 0 01-2.95 2.5zm12.44 0a3 3 0 01-1.7-5.5l.75 2.76a1 1 0 001 .73c.09.01.18.01.27 0a1 1 0 00.7-1.23l-.75-2.75a3.002 3.002 0 01-.23 6l-.04-.01z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                          <span
                            class=" css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Bike Parking
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* end test area */}

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
