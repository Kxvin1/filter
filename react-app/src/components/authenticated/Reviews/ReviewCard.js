import React, { useState, useEffect } from "react";
import { deleteReviewThunk, editReviewThunk } from "../../../store/review";
import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";

const ReviewCard = ({ review, user }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [reviewState, setReviewState] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    setRating(review?.rating * 2 * 10);
    setReviewState(review?.review);
  }, [review]);

  const deleteReview = async () => {
    dispatch(deleteReviewThunk(review.id));
    setShowDelete(false);
  };

  const editReview = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      editReviewThunk(review.id, reviewState, rating)
    );

    setShowEdit(false);
  };

  const closeForm = () => {
    setRating(review?.rating * 2 * 10);
    setReviewState(review?.review);
    setShowEdit(false);
    setShowDelete(false);
  };

  const avatars = [
    "https://randomuser.me/api/portraits/women/8.jpg", // not used
    "https://randomuser.me/api/portraits/lego/7.jpg", // demo
    "https://randomuser.me/api/portraits/men/44.jpg", // adam
    "https://randomuser.me/api/portraits/men/60.jpg", // jason
    "https://randomuser.me/api/portraits/men/53.jpg", // andrew
    "https://randomuser.me/api/portraits/women/60.jpg", // christina
    "https://randomuser.me/api/portraits/women/57.jpg", // sophia
    "https://randomuser.me/api/portraits/men/86.jpg", // stephen
    "https://randomuser.me/api/portraits/men/19.jpg", // klay
    "https://randomuser.me/api/portraits/women/17.jpg", // danielle
    "https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e", // hailey
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50",
    "https://images.unsplash.com/photo-1546539782-6fc531453083?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    "https://randomuser.me/api/portraits/women/9.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
    "https://randomuser.me/api/portraits/men/97.jpg",
    "https://randomuser.me/api/portraits/women/34.jpg",
  ];

  return (
    <div className="singleReview">
      <img className="avatar" src={avatars[review?.user_id]} alt="avatar" />
      <h3>{review?.user.username}</h3>
      <p>Reviewed: {review.date.slice(0, 16)}</p>
      <div className="rating">
        <Rating ratingValue={rating} readonly="true" size="30" />
      </div>
      {review.review}
      <div className="modifyReviewBtns">
        {review.user_id === user?.id && (
          <div>
            <button
              className="modifyBtn"
              title="Delete Review"
              onClick={() => setShowDelete(true)}
            >
              <i class="fa fa-trash"></i>
            </button>
            <button
              className="modifyBtn"
              title="Edit Review"
              onClick={() => setShowEdit(true)}
            >
              <i class="fas fa-edit"></i>
            </button>
          </div>
        )}
      </div>
      {showDelete && (
        <div className="modal">
          <div className="reviewFormModal">
            <div className="x" onClick={closeForm}>
              <i className="fas fa-times"></i>
            </div>
            <h2>Delete</h2>
            <h4>Are you sure you want to delete your review?</h4>
            <button className="modifyBtn" onClick={deleteReview}>
              Delete
            </button>
            <button className="modifyBtn" onClick={() => setShowDelete(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="modal">
          <div className="reviewFormModal">
            <div className="x" onClick={closeForm}>
              <i className="fas fa-times"></i>
            </div>
            <h2>Change your mind?</h2>
            <div className="starRatings">
              <div className="starTitle">Editing Rating</div>
              <Rating
                onClick={(rating) => setRating(rating)}
                ratingValue={rating}
                fillColor={"rgb(255, 215, 0)"}
              />
            </div>
            <div>
              <form className="commentForm" onSubmit={editReview}>
                <label>Edit Comment</label>
                <textarea
                  className="commentBox"
                  name="description"
                  type="input"
                  required
                  autoComplete="off"
                  value={reviewState}
                  onChange={(e) => setReviewState(e.target.value)}
                />
                <button className="modifyBtn" type="submit">
                  Edit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
