# Fidenz Weather App

Full-stack weather application with authentication – Fidenz Technologies Assignment

## Part 1: Weather Information Web/API Application

This repository contains the implementation of Part 1 of the Fidenz assignment, which includes:

1. A backend service that:
   - Reads city codes from a JSON file
   - Fetches weather data using OpenWeatherMap APIs
   - Implements data caching (5-minute expiration)

2. A frontend application that:
   - Displays weather information in a responsive layout
   - Automatically refreshes data every 5 minutes

## Project Structure

```
fidenz-weather-app/
│
├── backend/                             # Express.js backend
│   ├── src/
│   │   ├── server.js                    # Entry point (starts Express app)
│   │   ├── routes/
│   │   │   └── weatherRoutes.js         # Weather API route definitions
│   │   ├── controllers/
│   │   │   └── weatherController.js     # Handles weather API logic
│   │   ├── services/
│   │   │   └── weatherService.js        # Fetches OpenWeatherMap data
│   │   ├── utils/
│   │   │   └── cache.js                 # 5-minute cache handling
│   │   └── data/
│   │       └── cities.json              # City codes file
│   ├── package.json
│   ├── .env.example                     # Example env file (no real API key)
│   └── README.md
│
├── frontend/                            # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherCard.jsx          # Displays city + temp + description
│   │   │   ├── LoginButton.jsx
│   │   │   └── LogoutButton.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Main weather dashboard
│   │   │   └── Login.jsx
│   │   ├── auth/
│   │   │   └── Auth0ProviderWithHistory.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── README.md                            # Main project documentation
└── .gitignore
```

## Setup

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=3001
   ```

4. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## API Endpoints

- `GET http://localhost:3001/api/weather` - Get weather data for all cities
- `GET http://localhost:3001/api/weather/:cityId` - Get weather data for a specific city
- `GET http://localhost:3001/api/cities` - Get list of cities

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, Axios, Node-Cache
- **API**: OpenWeatherMap
- **Styling**: CSS Grid and Flexbox for responsive design

## Features Implemented

- ✅ Reads city codes from a JSON file
- ✅ Fetches weather data using OpenWeatherMap APIs
- ✅ Displays weather information with responsive layout
- ✅ Implements data caching (5-minute expiration)
- ✅ Auto-refreshes data every 5 minutes