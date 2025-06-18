import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';

export function useMovies(initialQuery = '', initialType = '') {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    let canceled = false;
    setLoading(true);
    setError(null);

    
    searchMovies(query, type, page)
      .then(data => {
        if (canceled) return;

        if (data.Response === 'True') {
          const newResults = data.Search || [];
          setTotalResults(parseInt(data.totalResults, 10));
          setMovies(prev =>
            page === 1 ? newResults : [...prev, ...newResults]
          );
        } else {
          setError(data.Error || 'No results found');
          setMovies([]);
          setTotalResults(0);
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

    return () => {
      canceled = true;
    };
  }, [query, type, page]);

  
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [query, type]);

  return {
    movies,
    totalResults,
    loading,
    error,
    query,
    type,
    page,
    setQuery,
    setType,
    setPage,
  };
}
