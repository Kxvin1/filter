import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

import "./Reviews.css";

const Reviews = ({ businessId, reviews, user }) => {
  const [sortedReviews, setSortedReviews] = useState([]);

  useEffect(() => {
    if (reviews[0] === null) {
      return;
    }

    const sortedReviews = reviews;

    sortedReviews.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    setSortedReviews(sortedReviews);
  }, [reviews]);

  const calculateAvgRatings = () => {
    if (reviews[0] === null) {
      return;
    }

    let totalRating = 0;

    reviews?.forEach((review) => {
      totalRating += review.cleanliness;
    });

    const length = reviews.length;

    const avgRating = (totalRating / length).toFixed(1);
    const avgTotal = (totalRating / (length * 1)).toFixed(2);

    const avgArray = [avgTotal, length, avgRating];
    return avgArray;
  };

  const avgRatings = calculateAvgRatings();
  console.log(avgRatings, "avgRatings");

  return (
    <>
      <div className="review-title-container">
        {/* <h2 className="reviews-h2">Reviews</h2> */}
        {reviews.length ? (
          <h2 className="reviews-h2">Recommended Reviews</h2>
        ) : (
          <h2 className="reviews-h2">No Reviews</h2>
        )}

        {/* <div className="starBox">
        <div>
          {reviews.length ? (
            <div className="starAvgs">
              <div>
              Rating
              <div className="bar">
              <div className="full">
                    <div
                      className="reviewBar"
                      // style={{ width: `${avgRatings[1] * 24}px` }}
                      ></div>
                      </div>
                      <div className="avgRatingPerCategory">{avgRatings[1]}</div>
                      </div>
                      </div>
                      </div>
                      ) : (
                          ""
                          )}
                          </div>
                        </div> */}
      </div>
      <div className="allReviewsContainer">
        {sortedReviews.map((review) => (
          <ReviewCard review={review} key={review.id} user={user} />
        ))}
      </div>
      <div>
        <ReviewForm businessId={businessId} userId={user.id} />
      </div>
    </>
  );
};

export default Reviews;
