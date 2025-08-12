import os
from datetime import datetime

from dotenv import load_dotenv
from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from marshmallow import ValidationError
import requests

from services.validation_service import validate_patient_details
from services.lifestyle_service import process_lifestyle_questionnaire
from schemas import ValidationInputSchema, LifestyleInputSchema
from helpers.age import calculate_age
from helpers.lifestyle_scoring import calculate_lifestyle_score
from helpers.age_banding import get_age_band
from scoring_matrix import scores
from constants import *

app = Flask(__name__)
CORS(app, supports_credentials=True)

load_dotenv()
API_KEY = os.getenv("API_KEY")
app.secret_key = os.getenv("FLASK_SECRET_KEY")

 # Fetch the patient from the API using NHS no.
def get_patient_from_api(nhs_number):
    url = f"{API_BASE_URL}/patients/{nhs_number}"
    headers = {"Ocp-Apim-Subscription-Key": API_KEY}
    res = requests.get(url, headers=headers, timeout=5)
    
    if res.status_code == 404:
        return None, 404
    if not res.ok:
        return None, 500
    return res.json(), 200

@app.route("/validation", methods=["POST"])
def validate_patient():
    data = request.get_json(silent=True)
    if data is None:
        data = request.form.to_dict()

    try:
        payload = ValidationInputSchema().load(data)
    except ValidationError as err:
        return jsonify({"error": ERROR_DETAILS_NOT_FOUND, "details": err.messages}), 400

    nhs_number = payload["nhsNumber"]
    surname_upper = payload["surname"].upper()
    dob_iso = payload["dateOfBirth"].strftime("%Y-%m-%d")

    patient, error, status = validate_patient_details(
        nhs_number, surname_upper, dob_iso, get_patient_from_api
    )
    if error:
        return jsonify({"error": error}), status

    session["nhs_number"] = nhs_number
    return jsonify(patient)

@app.route("/session-info", methods=["GET"])
def session_info():
    nhs_number = session.get("nhs_number")
    if not nhs_number:
        return jsonify({"error": ERROR_DETAILS_NOT_FOUND}), 404
    return jsonify({"nhsNumber": nhs_number})

@app.route("/lifestyle", methods=["POST"])
def lifestyle():
    data = request.get_json(silent=True)
    if data is None:
        data = request.form.to_dict()

    try:
        payload = LifestyleInputSchema().load(data)
    except ValidationError as err:
        return jsonify({"error": ERROR_DETAILS_NOT_FOUND, "details": err.messages}), 400

    nhs_number = payload["nhsNumber"]
    drink = payload["drink"]
    smoke = payload["smoke"]
    exercise = payload["exercise"]

    result, error, status = process_lifestyle_questionnaire(
        nhs_number, drink, smoke, exercise, get_patient_from_api
    )
    if error:
        return jsonify({"error": error}), status

    # store the health flag in the session
    session["isHealthy"] = result["isHealthy"]
    return jsonify(result)

@app.route("/results-info", methods=["GET"])
def results_info():
    is_healthy = session.get("isHealthy")
    if is_healthy is None:
        return jsonify({"error": "No results found"}), 404
    return jsonify({"isHealthy": is_healthy})

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Session cleared"})

if __name__ == "__main__":
    app.run(debug=True)
