from datetime import datetime
from constants import *
from helpers.age import calculate_age

# Validation questionnaire service flow:
# 1. fetches patient
# 2. ensures DOB exists
# 3. compares details to ensure they match
# 4. checks if patient is under the MIN AGE
# 5. returns the patient details if all checks pass

def _format_and_validate_dob(dob_str: str):
    try:
        dob_obj = datetime.strptime(dob_str, DATE_IN)
        return dob_obj.strftime(DATE_OUT), None
    except ValueError:
        return None, ERROR_INVALID_DOB

def _details_match(patient: dict, surname_upper: str, dob_formatted: str) -> bool:
    patient_surname = patient["name"].split(",")[0].strip().upper()
    return patient_surname == surname_upper and patient.get("born") == dob_formatted

def validate_patient_details(nhs_number: str, surname_upper: str, dob_iso: str, fetch_patient):
    patient, status = fetch_patient(nhs_number)
    if status == 404:
        return None, ERROR_DETAILS_NOT_FOUND, 404
    if status == 500:
        return None, ERROR_API, 500

    dob_formatted, dob_error = _format_and_validate_dob(dob_iso)
    if dob_error:
        return None, dob_error, 400

    if not _details_match(patient, surname_upper, dob_formatted):
        return None, ERROR_DETAILS_NOT_FOUND, 400

    age = calculate_age(dob_formatted)
    if age < MIN_AGE:
        return None, ERROR_UNDERAGE, 400

    return patient, None, 200
