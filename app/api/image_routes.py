from flask import Blueprint, request
from app.models import db, Image
from flask_login import login_required

import boto3
import botocore
from app.config import Config
from app.aws_s3 import *

image_routes = Blueprint("images", __name__)

# prefix: /api/images

# load images
@image_routes.route("/", methods=["GET"])
def load_images(id):
    images = Image.query.filter(Image.business_id == id)
    return {"images": [image.to_dict() for image in images]}


# delete image
@image_routes.route("/delete/<int:id>/", methods=["DELETE"])
@login_required
def delete_image(id):
    remove = Image.query.get(id)
    db.session.delete(remove)
    db.session.commit()
    return "Delete Successful"

# s3 stuff below

# upload image (s3)
@image_routes.route("/upload", methods=["POST"])
@login_required
def add_business_images():
    newFile = request.form.get("newFile")
    print(newFile)
    if newFile == "true":
        if "file" not in request.files:
            return "No user_file key in request.files"
        file = request.files["file"]

        if file:
            business_id = request.form.get("business_id")
            file_url = upload_file_to_s3(file)
            # file_url = file_url.replace(" ", "+")
            image = Image(business_id=business_id, url=file_url["url"])
            db.session.add(image)
            db.session.commit()

    if newFile == "false":
        print("********************************")
        business_id = request.form.get("business_id")
        url = request.form.get("file")
        print(business_id)
        print(url)
        image = Image(business_id=business_id, url=url)
        db.session.add(image)
        db.session.commit()

    return {"message": "success"}
