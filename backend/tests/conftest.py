# tests/conftest.py
import os
import sys
import pytest

# Add the parent directory to the Python path - needed to import the app from the root directory
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app as flask_app 

@pytest.fixture
def app():
    flask_app.config.update(TESTING=True, SECRET_KEY="test-secret")
    os.environ.setdefault("API_KEY", "test-key")
    return flask_app

@pytest.fixture
def client(app):
    return app.test_client()
