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
    let ratingS = business?.ratingSum;

    let ratingL = business?.ratingLen;

    const ratingAvg = ratingS / ratingL;

    let totalAvg = ratingAvg;

    if (!totalAvg) {
      return;
    }

    return totalAvg.toFixed(1).toString();
  };

  let reviewTextCounter;

  if (reviews.length === 0) {
    reviewTextCounter = <span className="banner-inner-p"></span>;
  } else if (reviews.length === 1) {
    reviewTextCounter = <span className="banner-inner-p">1 review</span>;
  } else {
    reviewTextCounter = (
      <span className="banner-inner-p">{reviews.length} reviews</span>
    );
  }

  const busRating = avgRating(business);

  return (
    <div className="business-details-banner-container">
      <div className="business-details-banner-content">
        <div className="business-details-banner-title-container">
          <h1 className="banner-inner-h1">{business?.name}</h1>
          <span className="stars" style={{ "--rating": `${rating}` }}>
            <span className="number-star-rating-banner-business-details">
              {busRating} <span>{reviewTextCounter}</span>
            </span>
          </span>
          <span className="banner-inner-p">
            <span className="open-text-banner">Open:</span> 8:00 AM - 4:00 PM
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsBanner;
