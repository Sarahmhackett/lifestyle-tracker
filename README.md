# NHS Lifestyle Tracker

This monorepo contains both the frontend (Next.js) and backend (Flask) components of the NHS lifestyle tracker application.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - for the frontend
- **Python** (v3.12 or higher) - for the backend
- **npm** or **yarn** - package manager for frontend
- **Poetry** - dependency manager for backend (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lifestyle_tracker
   ```

2. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up the Backend**
   ```bash
   cd backend
   # Install Poetry if you haven't already
   curl -sSL https://install.python-poetry.org | python3 -
   
   # Install dependencies
   poetry install
   ```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   poetry run python app.py
   ```
   The Flask server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The Next.js application will start on `http://localhost:3000`

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Build

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

2. **Run the Backend**
   ```bash
   cd backend
   poetry run python app.py
   ```

## 📡 API Endpoints

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
 $poetry run pytest

```

### Useful CURL requests

VALID PATIENT
```bash
curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{"nhsNumber": "111222333", "surname": "DOE", "dateOfBirth": "2007-01-14"}'
```

UNDER 16
```bash
  curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{"nhsNumber": "555666777", "surname": "MAY", "dateOfBirth": "2010-11-14"}'
```
OVER 66
```bash
curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{
    "nhsNumber": "444555666",
    "surname": "BOND",
    "dateOfBirth": "1955-08-11"
  }'
```

###  GENERAL THOUGHTS THROUGHOUT

- STAGE 2: Best way to store NHS No and/or Age in order to use the patient info on the scoring matrix. Settled on a session instead of local storage so that it persisted each refresh. In production, I would move to a token-based approach instead, because Flask sessions are usually cookie-based and can be manipulated unless secured properly.

- UNIT TESTING: Unit tests may break in the future if patient age falls outside of a banding dynamically. Future fix to work around this. 