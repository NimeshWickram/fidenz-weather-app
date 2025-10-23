import React from 'react';
import '../App.css';

const WeatherCard = ({ city }) => {
  return (
    <div className="weather-card">
      <h2>{city.name}</h2>
      <p className="description">{city.description}</p>
      <p className="temperature">{city.temperature}°C</p>
    </div>
  );
};

export default WeatherCard;