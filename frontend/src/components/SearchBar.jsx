import React, { useState } from 'react';

const SearchBar = ({ onSearch, cities }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 1) {
            const filteredSuggestions = cities.filter(city =>
                city.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
            setSearchTerm('');
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (cityName) => {
        setSearchTerm(cityName);
        setSuggestions([]);
        onSearch(cityName);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search for a city..."
                    className="search-input"
                    autoComplete="off"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleSuggestionClick(city.name)}
                            className="suggestion-item"
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;