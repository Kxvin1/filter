from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, IntegerField


class NewReviewForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    business_id = IntegerField("business_id", validators=[DataRequired()])
    review = StringField(
        "review", validators=[DataRequired("Your review can't be empty.")]
    )
    rating = IntegerField(
        "rating", validators=[DataRequired("Rating must be between 1 and 5.")]
    )
