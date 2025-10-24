import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherAppFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('weatherAppFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    setFavorites(prevFavorites => {
      // Check if city is already in favorites
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === city.id);
      if (isAlreadyFavorite) {
        return prevFavorites;
      }
      return [...prevFavorites, city];
    });
  };

  const removeFavorite = (cityId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(city => city.id !== cityId)
    );
  };

  const toggleFavorite = (city) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === city.id);
    if (isAlreadyFavorite) {
      removeFavorite(city.id);
    } else {
      addFavorite(city);
    }
  };

  const isFavorite = (cityId) => {
    return favorites.some(fav => fav.id === cityId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};

export default useFavorites;