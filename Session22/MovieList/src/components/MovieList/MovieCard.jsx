

import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, delay = 0 }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fallbackImage = '/ImageNotfound.png';

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };
  const toggleFavorite = e => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const posterSrc =
    movie.Poster && movie.Poster !== 'N/A' && !imageError
      ? movie.Poster
      : fallbackImage;

  return (
    <div
      className={`movie-card ${imageLoaded ? 'loaded' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="movie-poster-container">
        <img
          src={posterSrc}
          alt={movie.Title}
          className="movie-poster"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={toggleFavorite}
            aria-label="Add to favorites"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="loading-placeholder">
          <div className="loading-shimmer"></div>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.Title}>
          {movie.Title}
        </h3>
        <p className="movie-type">Type: {movie.Type}</p>
        <p className="movie-year">Release year: {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
