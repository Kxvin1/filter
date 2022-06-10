from flask import Flask, Blueprint
from flask_login import login_required
import os


key_routes = Blueprint("key", __name__)


@key_routes.route("/", methods=["POST"])
@login_required
def key():
    key = os.environ.get("MAPS_API_KEY")
    return {"googleMapsAPIKey": key}
