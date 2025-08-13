from constants import *
from helpers.age import calculate_age
from helpers.lifestyle_scoring import calculate_lifestyle_score

# lifestyle questionnaire service flow:
# 1. fetches patient
# 2. ensures DOB exists
# 3. calculates age for banding using age helper function
# 4. returns lifestyle using lifestyle scoring helper function 
# 5. returns the score, age and isHealthy (true/false) 

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