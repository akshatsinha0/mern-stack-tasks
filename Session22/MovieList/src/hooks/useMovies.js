import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';

export function useMovies(initialQuery = '', initialType = '') {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }
    let canceled = false;
    setLoading(true);
    setError(null);

    searchMovies(query, type)
      .then(data => {
        if (!canceled) {
          if (data.Response === 'True') {
            setMovies(data.Search);
          } else {
            setError(data.Error);
            setMovies([]);
          }
        }
      })
      .catch(err => {
        if (!canceled) {
          setError(err.message);
          setMovies([]);
        }
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => { canceled = true; };
  }, [query, type]);

  return { movies, loading, error, setQuery, setType };
}
