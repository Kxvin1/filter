# fmt: on
from .db import db

class Business(db.Model):
    __tablename__ = "businesses"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )  # user foreign key
    name = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    zipcode = db.Column(db.String(25), nullable=False)
    city = db.Column(db.String(80), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    country = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(25), nullable=False)
    website = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    # fmt: on
    #   - Many to One: Businesses belongsTo User (fk: user_id)
    user = db.relationship("User", back_populates="business")

    #   - One to Many: Business hasMany Images (fk: business_id)
    images_business = db.relationship(
        "Image", back_populates="business_image", cascade="all, delete"
    )

    #   - One to Many: Business hasMany Reviews (fk: business_id)
    review = db.relationship("Review", back_populates="business", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "address": self.address,
            "zipcode": self.zipcode,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "phone_number": self.phone_number,
            "website": self.website,
            "lat": self.lat,
            "lng": self.lng,
            "user": self.user.owner_info(),
            "images_business": [image.image_info() for image in self.images_business],
            "ratingSum": sum(
                [review.review_info()["rating"] for review in self.review]
            ),
            "ratingLen": len(
                [review.review_info()["rating"] for review in self.review]
            ),
            "totalReview": len([review.review_info() for review in self.review]),
        }
