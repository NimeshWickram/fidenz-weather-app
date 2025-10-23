import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  // For Part 1, we'll always show the Home component
  // Authentication will be implemented in Part 2
  const isAuthenticated = true; // Placeholder for Part 2

  return (
    <>
      <header>
        <h1>Weather Information</h1>
        {/* Authentication buttons will be implemented in Part 2 */}
      </header>
      <main>
        {isAuthenticated ? <Home /> : <Login />}
      </main>
    </>
  );
}

export default App