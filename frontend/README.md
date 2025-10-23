# Fidenz Weather App - Frontend

This is the frontend for the Fidenz Weather App assignment, built with React and Vite.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── WeatherCard.jsx          # Displays city + temp + description
│   │   ├── LoginButton.jsx
│   │   └── LogoutButton.jsx
│   ├── pages/
│   │   ├── Home.jsx                 # Main weather dashboard
│   │   └── Login.jsx
│   ├── auth/
│   │   └── Auth0ProviderWithHistory.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Features

- Displays weather information for multiple cities
- Responsive design that works on desktop and mobile
- Auto-refreshes data every 5 minutes
- Error handling for API failures

## Development

The frontend expects the backend to be running on `http://localhost:3001`. Make sure to start the backend server before running the frontend.

The main application code is in `src/App.jsx` and the styling is in `src/App.css`.