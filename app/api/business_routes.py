from flask import Blueprint, request
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from app.forms import NewBusinessForm
from app.models import db, Business, Image

business_routes = Blueprint("businesses", __name__)

# Prefix: /api/businesses

# get
@business_routes.route("")
def get():
    businesses = Business.query.all()
    results = [business.to_dict() for business in businesses]

    return {"businesses": results}


# create
@business_routes.route("", methods=["POST"])
@login_required
def add_business():
    form = NewBusinessForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        business = Business(
            user_id=data["user_id"],
            name=data["name"],
            address=data["address"],
            zipcode=data["zipcode"],
            city=data["city"],
            state=data["state"],
            country=data["country"],
            phone_number=data["phone_number"],
            website=data["website"],
            lat=data["lat"],
            lng=data["lng"],
            # price=data["price"],
        )

        # create a session and add to db
        db.session.add(business)
        db.session.commit()
        # return json object
        return business.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# update business
@business_routes.route("/<int:businessId>", methods=["PUT"])
@login_required
def update_business(businessId):

    form = NewBusinessForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        business = Business.query.filter(Business.id == businessId).first()

        business.user_id = data["user_id"]
        business.name = data["name"]
        business.address = data["address"]
        business.zipcode = data["zipcode"]
        business.city = data["city"]
        business.state = data["state"]
        business.country = data["country"]
        business.phone_number = data["phone_number"]
        business.website = data["website"]
        business.lat = data["lat"]
        business.lng = data["lng"]
        # business.price = data["price"]

        # images = Image.query.filter(Image.business_id == businessId).all()
        # for image in images:
        #     db.session.delete(image)
        # db.session.commit()

        return business.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# delete business
@business_routes.route("/<int:businessId>", methods=["DELETE"])
@login_required
def delete_business(businessId):
    businessToDelete = Business.query.filter(Business.id == businessId).first()

    if businessToDelete:
        db.session.delete(businessToDelete)
        db.session.commit()
        return {
            "id": businessToDelete.id,
            "user_id": businessToDelete.user_id,
            "name": businessToDelete.name,
            "address": businessToDelete.address,
            "zipcode": businessToDelete.zipcode,
            "city": businessToDelete.city,
            "state": businessToDelete.state,
            "country": businessToDelete.country,
            "phone_number": businessToDelete.phone_number,
            "website": businessToDelete.website,
            "lat": businessToDelete.lat,
            "lng": businessToDelete.lng,
            # "price": businessToDelete.price,
        }
