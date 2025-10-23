import { useState } from 'react'
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  // For Part 1, we'll always show the Home component
  // Authentication will be implemented in Part 2
  const isAuthenticated = true; // Placeholder for Part 2

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
        <p>Powered by OpenWeatherMap • Data updates every 5 minutes</p>
      </footer>
    </div>
  );
}

export default App