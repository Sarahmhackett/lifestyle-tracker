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
        "drink": False,      # means "yes" for q1 = 0pt
        "smoke": False,      # means "yes" for q2 = 0pt
        "exercise": False    # means "no" for q3 = 1pt
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

def test_lifestyle_missing_nhs_number(client):
    payload = {
        "drink": True,
        "smoke": False,
        "exercise": True
    }
    res = client.post("/lifestyle", json=payload)
    assert res.status_code == 400
    assert "error" in res.get_json()


@patch("app.get_patient_from_api")
def test_lifestyle_api_returns_404(mock_api, client):
    mock_api.return_value = (None, 404)

    payload = {
        "nhsNumber": "111222333",
        "drink": True,
        "smoke": False,
        "exercise": True
    }
    res = client.post("/lifestyle", json=payload)
    assert res.status_code == 404
    assert "error" in res.get_json()

# Missing DOB in patient record to calculate age band
@patch("app.get_patient_from_api")
def test_lifestyle_missing_dob_in_patient(mock_api, client):
    patient_no_dob = {
        "name": "DOE, JOHN",
        "nhsNumber": "111222333"
    }
    mock_api.return_value = (patient_no_dob, 200)

    payload = {
        "nhsNumber": "111222333",
        "drink": True,
        "smoke": False,
        "exercise": True
    }
    res = client.post("/lifestyle", json=payload)
    assert res.status_code == 400
    assert "error" in res.get_json()

# Unhealthy score - 7 points
@patch("app.get_patient_from_api")
def test_lifestyle_unhealthy_score(mock_api, client):
    mock_api.return_value = (VALID_PATIENT, 200)

    payload = {
        "nhsNumber": "111222333",
        "drink": True,
        "smoke": True,
        "exercise": False
    }
    res = client.post("/lifestyle", json=payload)
    assert res.status_code == 200

    data = res.get_json()
    assert data["lifestyleScore"] == 7
    assert data["isHealthy"] is False