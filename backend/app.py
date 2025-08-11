import os
from datetime import datetime

from dotenv import load_dotenv
from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
import requests

from utils.age import calculate_age
from utils.lifestyle_scoring import calculate_lifestyle_score
from utils.age_banding import get_age_band
from scoring_matrix import scores
from constants import *

app = Flask(__name__)
CORS(app, supports_credentials=True)

load_dotenv()
API_KEY = os.getenv("API_KEY")
app.secret_key = os.getenv("FLASK_SECRET_KEY")

def get_patient_from_api(nhs_number):
    url = f"https://al-tech-test-apim.azure-api.net/tech-test/t2/patients/{nhs_number}"
    headers = {"Ocp-Apim-Subscription-Key": API_KEY}
    res = requests.get(url, headers=headers)
    
    if res.status_code == 404:
        return None, 404
    if not res.ok:
        return None, 500
    return res.json(), 200

def format_and_validate_dob(dob_str):
    try:
        dob_obj = datetime.strptime(dob_str, "%Y-%m-%d")
        dob_formatted = dob_obj.strftime("%d-%m-%Y")
        return dob_formatted, None
    except ValueError:
        return None, ERROR_INVALID_DOB

def validate_patient_details(patient, surname, dob_formatted):
    patient_surname = patient["name"].split(",")[0].strip().upper()
    if patient_surname != surname or dob_formatted != patient["born"]:
        return False
    return True

@app.route("/validation", methods=["POST"])
def validate_patient():
    data = request.json
    nhs_number = data.get("nhsNumber")
    surname = data.get("surname", "").upper()
    dob = data.get("dateOfBirth")

    if not nhs_number:
        return jsonify({"error": ERROR_DETAILS_NOT_FOUND}), 400

    patient, status = get_patient_from_api(nhs_number)
    if status == 404:
        return jsonify({"status": ERROR_DETAILS_NOT_FOUND}), 404
    if status == 500:
        return jsonify({"error": ERROR_API}), 500

    dob_formatted, dob_error = format_and_validate_dob(dob)
    if dob_error:
        return jsonify({"error": dob_error}), 400

    if not validate_patient_details(patient, surname, dob_formatted):
        return jsonify({"error": ERROR_DETAILS_NOT_FOUND}), 400

    age = calculate_age(dob_formatted)
    if age < 16:
        return jsonify({"error": ERROR_UNDERAGE}), 400

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
    data = request.json
    nhs_number = data.get("nhsNumber")
    drink = data.get("drink")
    smoke = data.get("smoke")
    exercise = data.get("exercise")

    if not nhs_number:
        return jsonify({"error": ERROR_DETAILS_NOT_FOUND}), 400

    patient, status = get_patient_from_api(nhs_number)
    if status != 200:
        return jsonify({"error": ERROR_DETAILS_NOT_FOUND}), status

    dob_str = patient.get("born")
    if not dob_str:
        return jsonify({"error": ERROR_DOB_MISSING}), 400

    age = calculate_age(dob_str)

    lifestyle_score = calculate_lifestyle_score(age, drink, smoke, exercise)

    isHealthy = lifestyle_score < 3  # True = good, false = advice needed

    session["isHealthy"] = lifestyle_score < 3

    return jsonify({
        "nhsNumber": nhs_number,
        "lifestyleScore": lifestyle_score,
        "isHealthy": isHealthy,
        "age": age
    })

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
