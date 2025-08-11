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

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling

### Backend
- **Flask 3.1.1** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Requests** - HTTP library for external API calls
- **Poetry** - Dependency management

## 📡 API Endpoints

The backend provides the following endpoints:

- `GET /` - Health check endpoint
- `POST /validation` - Patient validation (placeholder)
- `POST /score` - User scoring (placeholder)

## 🎯 Features

- **Modern UI** - Built with Next.js and React 19
- **Type Safety** - Full TypeScript support
- **API Integration** - Flask backend with CORS support
- **Development Ready** - Hot reloading and debugging tools


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


CURL requests - MATCHES
curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{"nhsNumber": "111222333", "surname": "DOE", "dateOfBirth": "2007-01-14"}'

UNDER 16
  curl -X POST http://localhost:5000/validation \
  -H "Content-Type: application/json" \
  -d '{"nhsNumber": "555666777", "surname": "MAY", "dateOfBirth": "2010-11-14"}'

  -- 

  THOUGHTS

  STAGE 2: Storing the NHS No and Age for the calc - local storage, session cookies, redux...... 