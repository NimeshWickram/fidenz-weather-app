import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <h1>🌤️ Weather Dashboard</h1>
          <p>Real-time weather information for cities around the world</p>
        </div>
      </header>
      <main>
        <div className="main-content">
          {isAuthenticated ? <Home /> : <Login />}
        </div>
      </main>
      <footer className="app-footer">
        <p>Powered by OpenWeatherMap </p>
      </footer>
    </div>
  );
}

export default App;