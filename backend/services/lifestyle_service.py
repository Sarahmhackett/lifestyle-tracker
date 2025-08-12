from constants import *
from helpers.age import calculate_age
from helpers.lifestyle_scoring import calculate_lifestyle_score

# lifestyle questionnaire service flow:
# - fetch patient
# - ensure DOB exists
# - calculates age for banding
# - returns lifestyle score & returns health flag

def process_lifestyle_questionnaire(nhs_number: str, drink: bool, smoke: bool, exercise: bool, fetch_patient):
    patient, status = fetch_patient(nhs_number)
    if status != 200:
        return None, ERROR_DETAILS_NOT_FOUND, status

    dob_str = patient.get("born")
    if not dob_str:
        return None, ERROR_DOB_MISSING, 400

    age = calculate_age(dob_str)
    lifestyle_score = calculate_lifestyle_score(age, drink, smoke, exercise)
    is_healthy = lifestyle_score < HEALTHY_SCORE_THRESHOLD

    result = {
        "nhsNumber": nhs_number,
        "lifestyleScore": lifestyle_score,
        "isHealthy": is_healthy,
        "age": age,
    }
    return result, None, 200