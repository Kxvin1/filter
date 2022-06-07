from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, IntegerField


class EditReview(FlaskForm):
    review = StringField("review", validators=[DataRequired()])
    rating = IntegerField("rating", validators=[DataRequired()])
