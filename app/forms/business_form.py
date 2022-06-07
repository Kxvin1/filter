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
    user_id = IntegerField("UserId", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired()])
    zipcode = StringField("Zipcode", validators=[DataRequired(), zip_valid])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired(), state_valid])
    country = StringField("Country", validators=[DataRequired()])
    phone_number = StringField("Phone", validators=[DataRequired(), phone_valid])
    website = StringField("Website", validators=[DataRequired(), website_valid])
    lat = DecimalField("Latitude", validators=[DataRequired()])
    lng = DecimalField("Longitude", validators=[DataRequired()])
    # price = DecimalField("Price", validators=[DataRequired()])
