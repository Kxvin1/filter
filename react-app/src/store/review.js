const LOAD = "review/LOAD";
const NEW_REVIEW = "review/NEW_REVIEW";
const EDIT_REVIEW = "review/EDIT_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

const loadReviews = (reviews) => ({
  type: LOAD,
  reviews: reviews,
});

const newReview = (review) => ({
  type: NEW_REVIEW,
  review: review,
});

const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    review: review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId: reviewId,
  };
};

export const loadReviewsThunk = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${businessId}`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews));
  }
};

export const addNewReviewThunk =
  (user_id, business_id, review, rating) => async (dispatch) => {
    const res = await fetch("/api/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        business_id,
        review,
        rating,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(newReview(data));
      return [data];
    } else {
      return ["Error"];
    }
  };

export const editReviewThunk =
  (review_id, review, rating) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${review_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review_id,
        review,
        rating,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(editReview(data));
      return [data];
    } else {
      return ["Error"];
    }
  };

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    body: JSON.stringify({ reviewId }),
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
    return null;
  } else {
    return ["Error"];
  }
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allReviews = {};
      for (let review of action.reviews.reviews) {
        allReviews[review.id] = review;
      }
      return { ...allReviews };
    case NEW_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review,
      };
    case EDIT_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review,
      };
    case DELETE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
