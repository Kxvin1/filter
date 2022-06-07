# fmt: on
from .db import db

# Join -- defined outside so both tables can reference
# business_categories = db.Table(
#     "business_category",
#     db.Column(
#         "business_id", db.Integer, db.ForeignKey("businesses.id"), primary_key=True
#     ),
#     db.Column(
#         "category_id", db.Integer, db.ForeignKey("categories.id"), primary_key=True
#     ),
# )


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
    # fmt: off
    # price = db.Column(db.Float, nullable=True) # --> use later when implementing filtering by $/$$/$$$/$$$$

    # fmt: on
    #   - Many to One: Businesses belongsTo User (fk: user_id)
    user = db.relationship("User", back_populates="business")

    #   - One to Many: Business hasMany Images (fk: business_id)
    images_business = db.relationship(
        "Image", back_populates="business_image", cascade="all, delete"
    )

    #   - One to Many: Business hasMany Reviews (fk: business_id)
    review = db.relationship("Review", back_populates="business", cascade="all, delete")

    #   - One to Many: Business hasMany Categories (fk: business_id)
    # categories = db.relationship(
    #     "Category", back_populates="business", secondary=business_categories
    # )

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
            # "price": self.price,  # --> use later when implementing filtering by $/$$/$$$/$$$$
            "user": self.user.owner_info(),
            "images": [image.image_info() for image in self.images],
            "ratingSum": sum(
                [review.review_info()["rating"] for review in self.review]
            ),
            "ratingLen": len(
                [review.review_info()["rating"] for review in self.review]
            ),
            "totalReview": len([review.review_info() for review in self.review]),
        }


# class Category(db.Model):
#     __tablename__ = "categories"

#     id = db.Column(db.Integer, primary_key=True)
#     category_name = db.Column(db.String(255), nullable=False)

#     business = db.relationship(
#         "Business", back_populates="Categories", secondary=business_categories
#     )

#     def to_dict(self):
#         return {"category_name": self.category_name}
