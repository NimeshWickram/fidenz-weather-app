import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from '../components/WeatherCard';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const { user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                // Replace with your backend URL
                const response = await axios.get('http://localhost:3001/api/weather');
                setWeatherData(response.data);
                setError(null);
                setLastUpdated(new Date());
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError('Failed to fetch weather data. Please make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();

        // Refresh data every 5 minutes (300000 ms)
        const interval = setInterval(() => {
            fetchWeatherData();
        }, 300000);
        
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading weather data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <h3>Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button onClick={handleRefresh} className="retry-button">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="user-info">
                <div className="user-details">
                    {user?.picture && (
                        <img src={user.picture} alt={user.name} className="user-avatar" />
                    )}
                    <div>
                        <span className="user-name">Welcome, {user?.name}!</span>
                        {user && (
                            <div className="mfa-status">
                                <span className="mfa-indicator">
                                    {user['https://example.com/isMFAEnabled'] ? '🔒 MFA Enabled' : '🔓 MFA Not Enabled'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <LogoutButton />
            </div>
            
            <div className="header-controls">
                <div className="last-updated-info">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
                <button onClick={handleRefresh} className="refresh-button">
                    ↻ Refresh
                </button>
            </div>
            
            {weatherData.length === 0 ? (
                <div className="no-data">
                    <p>No weather data available</p>
                </div>
            ) : (
                <div className="weather-container">
                    {weatherData.map((city) => (
                        <WeatherCard key={city.id} city={city} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;