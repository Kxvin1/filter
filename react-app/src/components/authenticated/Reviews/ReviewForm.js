import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { addNewReviewThunk } from "../../../store/review";

const ReviewForm = ({ userId, businessId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationErrors.length > 0) {
      return;
    }

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

      window.scrollTo({ top: 1700, behavior: "smooth" });
      alert("Review submitted!");
    }
  };

  // useEffect(() => {
  //   const errors = [];

  //   if (review.length > 1500)
  //     errors.push("Review too long (maximum 1500 characters)");

  //   setValidationErrors(errors);
  // }, [review]);

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
          <div className="error_container_div">
            <ul className="error_container">
              {validationErrors.length > 0 &&
                validationErrors.map((error) => (
                  <li className="error_li" key={error} style={{ color: "red" }}>
                    {error}
                  </li>
                ))}
            </ul>
          </div>
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

          {/* start testing section */}

          <div class=" margin-t4__09f24__G0VVf padding-b6__09f24__hfdiP border-color--default__09f24__NPAKY">
            <button
              type="submit"
              class=" css-cednmx"
              data-activated="false"
              data-testid="post-button"
              value="submit"
              data-button="true"
            >
              <span class="css-1enow5j" data-font-weight="semibold">
                Post Review
              </span>
            </button>
          </div>

          {/* end testing section */}
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
