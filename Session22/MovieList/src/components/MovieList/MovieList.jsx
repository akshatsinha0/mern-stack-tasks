// File: src/components/MovieList/MovieList.jsx

import React, { useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import { useMovies } from '../../hooks/useMovies';
import './MovieList.css';

export default function MovieList() {
  const moviesPerPage = 8;
  const {
    movies,
    totalResults,
    loading,
    error,
    page,
    setQuery,
    setPage,
  } = useMovies('marvel', 'movie');

  const categories = [
    { id: 'marvel', label: 'Marvel Movie', query: 'marvel' },
    { id: 'funny',   label: 'Funny Movie',  query: 'comedy' },
    { id: 'animation', label: 'Animation Movie', query: 'animation' },
    { id: 'series',  label: 'Web Series Movie', query: 'series' },
  ];

  // Reset to first page whenever query changes
  useEffect(() => {
    setPage(1);
  }, [setQuery, setPage]);

  const handleCategoryChange = (id, query) => {
    setQuery(query);
  };

  const handleSearch = term => {
    setQuery(term.trim() ? term : 'marvel');
  };

  const maxPages = Math.min(
    5,
    Math.ceil(totalResults / moviesPerPage)
  );

  const startIndex = (page - 1) * moviesPerPage;
  const displayedMovies = movies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  return (
    <section id="movie-list" className="movie-list-section">
      <div className="movie-list-header">
        <img
          src="/MovieListText.png"
          alt="Movie List"
          className="movie-list-title-img"
        />

        <div className="movie-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn${cat.query === undefined ? '' : ''}`}
              onClick={() => handleCategoryChange(cat.id, cat.query)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      <div className="movies-content">
        {loading && <p className="loading-text">Loading movies…</p>}
        {error   && <p className="error-text">Error: {error}</p>}

        {!loading && !error && (
          <>
            <div className="movie-grid">
              {displayedMovies.map((movie, idx) => (
                <MovieCard
                  key={`${movie.imdbID}-${idx}`}
                  movie={movie}
                  delay={idx * 0.1}
                />
              ))}
            </div>

            <div className="pagination-info">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  className={`page-dot${num === page ? ' active' : ''}`}
                  onClick={() => setPage(num)}
                  disabled={num > maxPages}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              className="show-more-btn"
              onClick={() => setPage(prev => Math.min(prev + 1, 5))}
              disabled={page >= maxPages}
            >
              Show more..
              <span className="btn-ripple" />
            </button>
          </>
        )}
      </div>
    </section>
);
}
