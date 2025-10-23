import React from 'react';
import LoginButton from '../components/LoginButton';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Weather App Login</h1>
      <p>Please log in to access weather information.</p>
      <div className="login-info">
        <p><strong>Note:</strong> Only pre-registered users can access this application.</p>
        <p>Test Account:</p>
        <p>Email: careers@fidenz.com</p>
        <p>Password: Pass#fidenz</p>
      </div>
      <LoginButton />
    </div>
  );
};

export default Login;