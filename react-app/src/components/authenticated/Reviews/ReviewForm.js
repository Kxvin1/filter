import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { addNewReviewThunk } from "../../../store/review";

const ReviewForm = ({ userId, businessId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !review) {
      setShowError(true);
      return;
    }

    const data = await dispatch(
      addNewReviewThunk(userId, businessId, review, rating)
    );

    if (data[0] === "Error") {
      setShowError(true);
    } else {
      setRating(0);
      setReview("");
      setShowError(false);

      //   document
      //     .querySelector("#starRatings")
      //     .scrollIntoView({ behavior: "smooth" });
      window.scrollTo(500, 500);
    }
  };
  return (
    <>
      <form className="reviewForm" onSubmit={handleSubmit}>
        <div className="ratings">
          <div className="ratingLabel">Rate the business</div>
          <Rating
            onClick={(rating) => setRating(rating)}
            ratingValue={rating}
            fillColor={"rgb(255, 215, 0)"}
          />
        </div>
        <div className="commentForm">
          <label>Share your experience!</label>
          <textarea
            className="commentBoxInput"
            name="description"
            type="input"
            value={review}
            required
            autoComplete="off"
            onChange={(e) => setReview(e.target.value)}
          />
          {showError && (
            <div className="reviewError">
              Please fill out a star rating as well as a comment!
            </div>
          )}
          <button className="modifyBtn" type="submit">
            New Review
          </button>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
