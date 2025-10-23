import React from 'react';
import LoginButton from '../components/LoginButton';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Weather App Login</h1>
      <p>Please log in to access weather information.</p>
      <LoginButton />
    </div>
  );
};

export default Login;