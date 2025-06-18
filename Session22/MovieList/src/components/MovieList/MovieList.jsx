// File: src/components/MovieList/MovieList.jsx

import React, { useState, useEffect } from 'react';        // React hooks for state and lifecycle[1]
import MovieCard from './MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import { useMovies } from '../../hooks/useMovies';
import './MovieList.css';

const MovieList = () => {
  const [activeCategory, setActiveCategory] = useState('marvel');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;
  const { movies, loading, error, setQuery } = useMovies('marvel', 'movie');

  const categories = [
    { id: 'marvel', label: 'Marvel Movie', query: 'marvel' },
    { id: 'funny', label: 'Funny Movie', query: 'comedy' },
    { id: 'animation', label: 'Animation Movie', query: 'animation' },
    { id: 'series', label: 'Web Series Movie', query: 'series' }
  ];

  // Whenever category changes, reset query and page[1]
  useEffect(() => {
    const cat = categories.find(c => c.id === activeCategory);
    if (cat) {
      setQuery(cat.query);
      setCurrentPage(1);
    }
  }, [activeCategory, setQuery]);

  const handleCategoryChange = id => setActiveCategory(id);
  const handleSearch = term => {
    if (term.trim()) {
      setQuery(term);
      setActiveCategory('');
    } else {
      setActiveCategory('marvel');
    }
    setCurrentPage(1);
  };

  // Compute current page slice[2]
  const startIndex = (currentPage - 1) * moviesPerPage;
  const displayedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  const handlePageClick = page => setCurrentPage(page);

  return (
    <section id="movie-list" className="movie-list-section">
      <div className="movie-list-header">
        <img src="/MovieListText.png" alt="Movie List" className="movie-list-title-img" />
        <div className="movie-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      <div className="movies-content">
        {loading && <p className="loading-text">Loading movies...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && (
          <>
            <div className="movie-grid">
              {displayedMovies.map((movie, idx) => (
                <MovieCard key={movie.imdbID + idx} movie={movie} delay={idx * 0.1} />
              ))}
            </div>

            <div className="pagination-info">
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={`page-dot ${page === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="show-more-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 5))}
              disabled={currentPage >= 5}
            >
              Show more..
              <span className="btn-ripple" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default MovieList;
