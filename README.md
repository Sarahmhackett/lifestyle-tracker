# NHS Lifestyle Tracker

A web application for tracking and scoring patient lifestyle factors (drinking, smoking, exercise). The application validates patient details and provides personalised health recommendations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.12+)
- Poetry (recommended) or pip

### Installation

1. **Clone and setup frontend:**
   ```bash
   git clone <repository-url>
   cd lifestyle_tracker/frontend
   npm install
   ```

2. **Setup backend:**
   ```bash
   cd ../backend
   poetry install  # or: pip install -r requirements.txt
   ```

3. **Environment variables:**
   Create `.env` file in backend directory:
   ```bash
   API_KEY=your_api_key_here
   FLASK_SECRET_KEY=your_secret_key_here
   ```

## 🏃‍♂️ Running the Application

### Development
```bash
# Terminal 1 - Backend
cd backend
poetry run python app.py  # Runs on http://localhost:5000

# Terminal 2 - Frontend  
cd frontend
npm run dev  # Runs on http://localhost:3000
```

### Production
```bash
cd frontend && npm run build && npm start
cd backend && poetry run python app.py
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/validation` | POST | Validate patient NHS number and details |
| `/session-info` | GET | Get current session patient info |
| `/lifestyle` | POST | Submit lifestyle questionnaire |
| `/results-info` | GET | Get lifestyle assessment results |
| `/logout` | POST | Clear session data |

## 📦 Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
```

### Backend Scripts
```bash
poetry run python app.py  # Run Flask development server
poetry install           # Install dependencies
poetry update           # Update dependencies
```

### Pytest Tests
```bash
cd backend
 $poetry run pytest

```

### React Testing Library
```bash
cd frontend
npm run test
```

## 🔧 Development

### Useful CURL Requests

**VALID PATIENT**
```bash
curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{"nhsNumber": "111222333", "surname": "DOE", "dateOfBirth": "2007-01-14"}'
```

**UNDER 16**
```bash
curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{"nhsNumber": "555666777", "surname": "MAY", "dateOfBirth": "2010-11-14"}'
```

**OVER 66**
```bash
curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{
    "nhsNumber": "444555666",
    "surname": "BOND", 
    "dateOfBirth": "1955-08-11"
  }'
```

### General Thoughts Throughout

- **STAGE 2**: Considered the best way to store NHS Num and/or Age in order to create/use the same patient info against the scoring matrix and age banding. Settled on a Session instead of local storage, so that it persisted each refresh. 

- **UNIT TESTING**: Potential for unit tests may break in the future if patient's age falls outside of a banding. Kept it as a known risk for this task but it would be a future improvement.  