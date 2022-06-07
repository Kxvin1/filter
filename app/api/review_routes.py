from flask import Blueprint, request
from flask_login import login_required
from app.models import Review, db
from app.forms import NewReviewForm, EditReview
from .auth_routes import validation_errors_to_error_messages
import datetime


review_routes = Blueprint("review", __name__)

# Prefix: /api/reviews

# get
@review_routes.route("/<int:id>")
def get_reviews(id):
    reviews = Review.query.filter(Review.business_id == id)
    return {"reviews": [review.to_dict() for review in reviews]}


# create
@review_routes.route("/", methods=["POST"])
@login_required
def new_review():
    form = NewReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review = Review(
            user_id=form.data["user_id"],
            business_id=form.data["business_id"],
            review=form.data["review"],
            rating=form.data["rating"] / 2 / 10,
            date=datetime.datetime.now().date(),
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


# update
@review_routes.route("/<int:id>", methods=["PUT"])
def edit_review(id):
    form = EditReview()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review = Review.query.filter(Review.id == id).first()
        review.review = (form.data["review"],)
        review.rating = (form.data["rating"] / 2 / 10,)
        db.session.commit()
        return review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


# delete
@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    deleteReview = Review.query.filter(Review.id == id).first()

    if deleteReview:
        db.session.delete(deleteReview)
        db.session.commit()
        return {"id": deleteReview.id}
