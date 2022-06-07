# fmt: on
from .db import db


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )  # user foreign key
    business_id = db.Column(
        db.Integer, db.ForeignKey("businesses.id"), nullable=False
    )  # business foreign key
    review = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False, unique=False)

    #   - Many to One: Reviews belongsTo User (fk: user_id)
    user = db.relationship("User", back_populates="review")

    #   - Many to One: Reviews belongsTo Businesses (fk: business_id)
    business = db.relationship("Business", back_populates="review")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "business_id": self.business_id,
            "review": self.review,
            "rating": self.rating,
            "date": self.date,
            "user": self.user.owner_info(),
        }

    def review_info(self):
        return {"id": self.id, "rating": self.rating}
