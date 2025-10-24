# How to Run the Application

## Prerequisites

1. Node.js (version 14 or higher)
2. npm (comes with Node.js)
3. An OpenWeatherMap API key (get one from https://openweathermap.org/api)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

4. Start the backend server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and go to the URL shown in the terminal (typically http://localhost:5173)

## API Endpoints

With the backend running, you can access these endpoints:

- `GET http://localhost:3001/api/weather` - Get weather data for all cities
- `GET http://localhost:3001/api/weather/:cityId` - Get weather data for a specific city
- `GET http://localhost:3001/api/cities` - Get list of cities

## Features

- Weather data is cached for 5 minutes to reduce API calls
- Frontend automatically refreshes data every 5 minutes
- Responsive design that works on desktop and mobile devices