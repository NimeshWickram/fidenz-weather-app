import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  // Handle MFA required error
  if (error && error.error === 'mfa_required') {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Multi-Factor Authentication Required</h3>
          <p>Please complete the MFA process to access the application.</p>
          <p>You will be redirected to the MFA setup page.</p>
        </div>
      </div>
    );
  }

  // Handle other authentication errors
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Authentication Error</h3>
          <p>{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Try Again
          </button>
        </div>
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