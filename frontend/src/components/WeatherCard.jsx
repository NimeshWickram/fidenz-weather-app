import React from 'react';
import FavoriteButton from './FavoriteButton';
import '../App.css';

const WeatherCard = ({ city, isFavorite, onToggleFavorite }) => {
  // Function to get weather icon based on description
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  // Function to get background color based on temperature
  const getTemperatureColor = (temp) => {
    if (temp > 30) return '#ff6b6b'; // Hot
    if (temp > 20) return '#4ecdc4'; // Warm
    if (temp > 10) return '#45b7d1'; // Mild
    if (temp > 0) return '#96ceb4';  // Cool
    return '#a9a9a9'; // Cold
  };

  // Function to get background gradient based on weather
  const getWeatherBackground = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return 'linear-gradient(135deg, #74b9ff, #0984e3)';
    if (desc.includes('cloud')) return 'linear-gradient(135deg, #636e72, #b2bec3)';
    if (desc.includes('rain')) return 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
    if (desc.includes('snow')) return 'linear-gradient(135deg, #81ecec, #00cec9)';
    if (desc.includes('thunder')) return 'linear-gradient(135deg, #2d3436, #636e72)';
    if (desc.includes('mist') || desc.includes('fog')) return 'linear-gradient(135deg, #b2fefa, #0ed2f7)';
    return 'linear-gradient(135deg, #fd79a8, #fdcb6e)';
  };

  return (
    <div 
      className="weather-card"
      style={{ background: getWeatherBackground(city.description) }}
    >
      <div className="weather-header">
        <h2>{city.name}</h2>
        <div className="weather-icon">{getWeatherIcon(city.description)}</div>
      </div>
      <div className="weather-info">
        <p className="description">{city.description}</p>
        <p 
          className="temperature"
          style={{ color: getTemperatureColor(city.temperature) }}
        >
          {city.temperature}°C
        </p>
      </div>
      <div className="weather-footer">
        <FavoriteButton 
          city={city}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
        <span className="last-updated">Updated just now</span>
      </div>
    </div>
  );
};

export default WeatherCard;