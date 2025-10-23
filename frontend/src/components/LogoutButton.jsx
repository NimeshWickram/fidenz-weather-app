import React from 'react';

const LogoutButton = () => {
  // This is a placeholder for Part 2 implementation
  const handleLogout = () => {
    console.log('Logout button clicked');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Log Out
    </button>
  );
};

export default LogoutButton;