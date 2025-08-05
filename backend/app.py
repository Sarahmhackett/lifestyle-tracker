from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "Flask is running!"

@app.route("/validation", methods=["POST"])
def validate_patient():
    data = request.json
    # TBC
    return jsonify({"message": "placeholder"})

@app.route("/score", methods=["POST"])
def score_user():
    data = request.json
    # TBC
    return jsonify({"message": "placeholder"})


if __name__ == "__main__":
    app.run(debug=True)