from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField,
    IntegerField,
    DecimalField,
)
from wtforms.validators import DataRequired, ValidationError

# fmt: off
states = [
 'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
 'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
 'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
 'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
 'VT','VI','VA','WA','WV','WI','WY'
]

# fmt: on


def zip_valid(form, field):
    zipcode = field.data
    if not zipcode.isdigit() or len(zipcode) != 5:
        raise ValidationError("Zipcode invalid.")


def phone_valid(form, field):
    phone = field.data
    if not phone.isdigit() or len(phone) != 10:
        raise ValidationError("Enter a valid 10 digit phone number.")


def website_valid(form, field):
    web = field.data
    if "http" not in web or "." not in web:
        raise ValidationError("Enter a valid website link.")


def state_valid(form, field):
    state = field.data
    if len(state) != 2 or state not in states:
        raise ValidationError("Enter a valid state abbreviation.")


class NewBusinessForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    zipcode = StringField("zipcode", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    country = StringField("country", validators=[DataRequired()])
    phone_number = StringField("phone_number", validators=[DataRequired()])
    website = StringField("website", validators=[DataRequired()])
    lat = DecimalField("lat", validators=[DataRequired()])
    lng = DecimalField("lng", validators=[DataRequired()])
    # price = DecimalField("Price", validators=[DataRequired()])
