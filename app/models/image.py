# fmt: on
from .db import db


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    url = db.Column(db.Text, nullable=False)

    #   - Many to One: Images belongsTo User (fk: user_id)
    user_image = db.relationship("User", back_populates="images_user")

    #   - Many to One: Images belongsTo Business (fk: business_id)
    business_image = db.relationship("Business", back_populates="images_business")

    def to_dict(self):
        return {
            "id": self.id,
            "business_id": self.business_id,
            "user_id": self.user_id,
            "url": self.url,
        }

    def image_info(self):
        return self.url
