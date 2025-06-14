
import React, { useState } from 'react';

export default function MovieCard({ movie }) {
  const [fav, setFav] = useState(false);

  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.png'}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="info">
        <h3>{movie.Title}</h3>
        <small>Type: {movie.Type}</small><br />
        <small>Release Year: {movie.Year}</small>
      </div>
      <div className="favorite-icon" onClick={() => setFav(!fav)}>
        <svg viewBox="0 0 24 24" fill="none" stroke={fav ? '#e0245e' : '#40c791'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21C12 21 4.5 13.5 4.5 8.5C4.5 6 6.5 4 9 4C10.5 4 12 5 12 5C12 5 13.5 4 15 4C17.5 4 19.5 6 19.5 8.5C19.5 13.5 12 21 12 21Z" />
        </svg>
      </div>
    </div>
  );
}
