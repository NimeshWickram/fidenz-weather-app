import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        // Request MFA during login
        acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
      }
    });
  };

  return (
    <button 
      onClick={handleLogin}
      className="auth-button login-button"
    >
      Log In with MFA
    </button>
  );
};

export default LoginButton;