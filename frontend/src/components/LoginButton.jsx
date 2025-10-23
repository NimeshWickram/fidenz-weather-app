import React from 'react';

const LoginButton = () => {
  // This is a placeholder for Part 2 implementation
  const handleLogin = () => {
    console.log('Login button clicked');
  };

  return (
    <button onClick={handleLogin} className="login-button">
      Log In
    </button>
  );
};

export default LoginButton;