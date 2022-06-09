import star from "../../../../logo-images/star-96.png";
import { useEffect } from "react";

import "./Banner.css";

const BusinessDetailsBanner = ({ business, reviews }) => {
  let rating = 0;
  const ratings = reviews?.map((review) => review.rating);
  if (ratings.length) {
    ratings?.forEach((rate) => (rating = rate + rating));
    rating = rating / ratings.length;
  }

  // scroll to top when they click a business page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const avgRating = (business) => {
    let ratingS = business.ratingSum;

    let ratingL = business.ratingLen;

    const ratingAvg = ratingS / ratingL;

    let totalAvg = ratingAvg;

    if (!totalAvg) {
      return;
    }

    // this is temporary, will make the review seeds have a higher chance of leaving a review of 4 or higher
    // if (totalAvg >= 5) {
    //   totalAvg = Math.random() * (4.9 - 4.4) + 4.4;
    // }

    return totalAvg.toFixed(1).toString();
  };

  const busRating = avgRating(business);

  console.log(business, "business in banner details");

  return (
    <div className="business-details-banner-container">
      <div className="business-details-banner-content">
        <div className="business-details-banner-title-container">
          <h1 className="banner-inner-h1">{business?.name}</h1>
          <span className="stars" style={{ "--rating": `${rating}` }}>
            <span className="number-star-rating-banner-business-details">
              {busRating}{" "}
              <span className="banner-inner-p">{reviews.length} reviews</span>
            </span>
          </span>
          {/* <p className="banner-inner-p">{reviews.length} reviews </p> */}
          <span className="banner-inner-p">
            <span className="open-text-banner">Open:</span> 8:00 AM - 4:00 PM
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsBanner;
