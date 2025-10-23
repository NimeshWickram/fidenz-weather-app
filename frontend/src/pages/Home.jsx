import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';

const Home = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                // Replace with your backend URL
                const response = await axios.get('http://localhost:3001/api/weather');
                setWeatherData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError('Failed to fetch weather data. Please make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();

        // Refresh data every 5 minutes (300000 ms)
        const interval = setInterval(fetchWeatherData, 300000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="loading">Loading weather data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="weather-container">
            {weatherData.map((city) => (
                <WeatherCard key={city.id} city={city} />
            ))}
        </div>
    );
};

export default Home;