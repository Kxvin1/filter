from flask_wtf import FlaskForm
from wtforms import StringField


class NewSearchForm(FlaskForm):
    city = StringField("city")
    state = StringField("state")
