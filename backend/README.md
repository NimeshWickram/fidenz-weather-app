# Weather App Backend

This is the backend service for the Fidenz Weather App assignment.

## Project Structure

```
backend/
├── src/
│   ├── server.js                    # Entry point (starts Express app)
│   ├── routes/
│   │   └── weatherRoutes.js         # Weather API route definitions
│   ├── controllers/
│   │   └── weatherController.js     # Handles weather API logic
│   ├── services/
│   │   └── weatherService.js        # Fetches OpenWeatherMap data
│   ├── utils/
│   │   └── cache.js                 # 5-minute cache handling
│   └── data/
│       └── cities.json              # City codes file
├── package.json
├── .env.example                     # Example env file (no real API key)
└── README.md
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=3001
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/weather` - Get weather data for all cities
- `GET /api/weather/:cityId` - Get weather data for a specific city
- `GET /api/cities` - Get list of cities

## Caching

Weather data is cached for 5 minutes to reduce API calls to OpenWeatherMap.