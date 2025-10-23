import React from 'react';

const FavoriteButton = ({ city, isFavorite, onToggleFavorite }) => {
  const handleClick = () => {
    onToggleFavorite(city);
  };

  return (
    <button 
      onClick={handleClick}
      className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton;