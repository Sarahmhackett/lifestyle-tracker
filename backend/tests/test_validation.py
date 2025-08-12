from unittest.mock import patch

VALID_PATIENT = {
    "name": "DOE, JOHN",
    "born": "14-01-2007",
    "nhsNumber": "111222333"
}

UNDERAGE_PATIENT = {
    "name": "DOE, JOHN",
    "born": "01-01-2010",
    "nhsNumber": "111222333"
}

#--------------------------------
# HAPPY PATH TEST - patient details match the record
#--------------------------------

@patch("app.get_patient_from_api")
def test_validate_patient_happy_path(mock_api, client):
    mock_api.return_value = (VALID_PATIENT, 200)

    payload = {
        "nhsNumber": "111222333",
        "surname": "DOE",
        "dateOfBirth": "2007-01-14"
    }

    res = client.post("/validation", json=payload)

    assert res.status_code == 200

    data = res.get_json()
    assert data["nhsNumber"] == "111222333"
    assert data["name"].startswith("DOE")

#--------------------------------
# ERROR PATH TESTS
#--------------------------------

# Missing NHS Number 
def test_validate_patient_missing_nhs_number(client):
    payload = {
        "surname": "DOE",
        "dateOfBirth": "2007-01-14"
    }
    res = client.post("/validation", json=payload)
    assert res.status_code == 400
    assert "error" in res.get_json()

# Incorrect NHS Nummber
@patch("app.get_patient_from_api")
def test_validate_patient_api_returns_404(mock_api, client):
    mock_api.return_value = (None, 404)

    payload = {
        "nhsNumber": "1234567890",
        "surname": "DOE",
        "dateOfBirth": "2007-01-14"
    }
    res = client.post("/validation", json=payload)
    assert res.status_code == 404
    assert "error" in res.get_json()

# Invalid DOB format
@patch("app.get_patient_from_api")
def test_validate_patient_invalid_dob_format(mock_api, client):
    mock_api.return_value = (VALID_PATIENT, 200)

    payload = {
        "nhsNumber": "1234567890",
        "surname": "DOE",
        "dateOfBirth": "14/01/2007"  # Wrong format
    }
    res = client.post("/validation", json=payload)
    assert res.status_code == 400
    assert "error" in res.get_json()

# Incorrect DOB doesn't match the record
@patch("app.get_patient_from_api")
def test_validate_patient_invalid_dob_input(mock_api, client):
    mock_api.return_value = (VALID_PATIENT, 200)

    payload = {
        "nhsNumber": "1234567890",
        "surname": "DOE",
        "dateOfBirth": "15/01/2007" 
    }
    res = client.post("/validation", json=payload)
    assert res.status_code == 400
    assert "error" in res.get_json()

# Surname doesn't match the record
@patch("app.get_patient_from_api")
def test_validate_patient_details_mismatch(mock_api, client):
    mock_api.return_value = (VALID_PATIENT, 200)

    payload = {
        "nhsNumber": "111222333",
        "surname": "SMITH", 
        "dateOfBirth": "2007-01-14"
    }
    res = client.post("/validation", json=payload)
    assert res.status_code == 400
    assert "error" in res.get_json()

# Under 16 patient record
@patch("app.get_patient_from_api")
def test_validate_patient_underage(mock_api, client):
    mock_api.return_value = (UNDERAGE_PATIENT, 200)

    payload = {
        "nhsNumber": "111222333",
        "surname": "DOE",
        "dateOfBirth": "2010-01-01"
    }
    res = client.post("/validation", json=payload)
    assert res.status_code == 400
    assert "error" in res.get_json()