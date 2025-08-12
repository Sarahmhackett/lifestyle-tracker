from unittest.mock import patch

VALID_PATIENT = {
    "name": "DOE, JOHN",
    "born": "14-01-1950", # Age is 66+, therefore is in the 66-150 band
    "nhsNumber": "111222333"
}

#--------------------------------
# HAPPY PATH TEST 
#--------------------------------

@patch("app.get_patient_from_api")
def test_lifestyle_happy_path_with_real_scoring(mock_api, client):
    mock_api.return_value = (VALID_PATIENT, 200)

    payload = {
        "nhsNumber": "111222333",
        "drink": False,       # means "yes" for q1 = 0pt
        "smoke": False,      # means "yes" for q2 = 0pt
        "exercise": False     # means "no" for q3 = 1pt
    }

    res = client.post("/lifestyle", json=payload)
    assert res.status_code == 200

    data = res.get_json()
    assert data["lifestyleScore"] == 1
    assert data["isHealthy"] is True  # < 3 means healthy
    assert 66 <= data["age"] <= 150

#--------------------------------
# ERROR PATH TESTS
#--------------------------------

