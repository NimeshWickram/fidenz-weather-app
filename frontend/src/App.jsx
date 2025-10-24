import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Login from './pages/Login';
import { validateUserAccess } from './auth/userValidation';
import './App.css';

function App() {
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  // Handle authentication errors
  if (error) {
    console.error('Authentication error:', error);
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Authentication Error</h3>
          <p>{error.message}</p>
          <p>Error: {error.error}</p>
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

  // If user is authenticated, validate access
  if (isAuthenticated) {
    const validation = validateUserAccess(user);

    if (!validation.isValid) {
      return (
        <div className="error-container">
          <div className="error-message">
            <h3>Access Denied</h3>
            <p>{validation.reason}</p>
            <p>Only pre-registered users can access this application.</p>
            <LogoutButton />
          </div>
        </div>
      );
    }
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

// We need to define LogoutButton here since it's used in the App component
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="auth-button logout-button"
      style={{ marginTop: '1rem' }}
    >
      Log Out
    </button>
  );
};

export default App;