import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from '../components/WeatherCard';
import LogoutButton from '../components/LogoutButton';
import SearchBar from '../components/SearchBar';
import useFavorites from '../hooks/useFavorites';

const Home = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [allWeatherData, setAllWeatherData] = useState([]); // Store all data for search
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const { user } = useAuth0();
    const [cities, setCities] = useState([]);
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/cities');
                setCities(response.data);
            } catch (err) {
                console.error('Error fetching cities:', err);
            }
        };

        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                // Fetch all weather data
                const response = await axios.get('http://localhost:3001/api/weather');
                setAllWeatherData(response.data);
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

        fetchCities();
        fetchWeatherData();

        // Refresh data every 5 minutes (300000 ms)
        const interval = setInterval(() => {
            fetchWeatherData();
        }, 300000);
        
        return () => clearInterval(interval);
    }, []);

    const handleSearch = async (searchTerm) => {
        try {
            // Filter the existing data based on search term
            const filteredData = allWeatherData.filter(city =>
                city.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (filteredData.length > 0) {
                setWeatherData(filteredData);
            } else {
                // If no matches found in existing data, try to fetch specific city data
                // This would require implementing a search endpoint in the backend
                setError(`No cities found matching "${searchTerm}"`);
                setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
            }
        } catch (err) {
            console.error('Error searching weather data:', err);
            setError('Failed to search weather data.');
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const toggleFavoritesView = () => {
        setShowFavoritesOnly(!showFavoritesOnly);
    };

    // Filter weather data based on favorites view
    const displayedWeatherData = showFavoritesOnly 
        ? weatherData.filter(city => isFavorite(city.id))
        : weatherData;

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
            
            <SearchBar onSearch={handleSearch} cities={cities} />
            
            <div className="header-controls">
                <div className="last-updated-info">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
                <div className="view-controls">
                    <button 
                        onClick={toggleFavoritesView}
                        className={`view-toggle-button ${showFavoritesOnly ? 'active' : ''}`}
                    >
                        {showFavoritesOnly ? 'Show All Cities' : 'Show Favorites Only'}
                    </button>
                    <button onClick={handleRefresh} className="refresh-button">
                        ↻ Refresh
                    </button>
                </div>
            </div>
            
            {displayedWeatherData.length === 0 ? (
                <div className="no-data">
                    <p>{showFavoritesOnly ? 'No favorite cities added yet.' : 'No weather data available'}</p>
                    {!showFavoritesOnly && (
                        <button onClick={toggleFavoritesView} className="auth-button">
                            View Favorites
                        </button>
                    )}
                </div>
            ) : (
                <div className="weather-container">
                    {displayedWeatherData.map((city) => (
                        <WeatherCard 
                            key={city.id} 
                            city={city} 
                            isFavorite={isFavorite(city.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;