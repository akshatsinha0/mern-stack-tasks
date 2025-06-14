import React, { useState, useEffect } from 'react';
import './styles.css';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import axios from 'axios';

const App = () => {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const [searchTerm, setSearchTerm] = useState();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ['Marvel', 'Funny', 'Animation', 'Web Series'];

  const fetchMovies = async (title) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSubmit = () => {
    if (searchTerm.trim()) fetchMovies(searchTerm);
  };

  return (
    <div className="container">
      <h1 className="title">MOVIE LIST</h1>

      <div className="category-buttons">
        {categories.map((cat, index) => (
          <button key={index} className="category-button" onClick={() => fetchMovies(cat)}>
            {cat} Movie
          </button>
        ))}
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onSearchSubmit={handleSubmit}
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
          ) : (
            <p className="no-movie">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
