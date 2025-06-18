const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(query, type = '') {
  if (!API_KEY) {
    throw new Error('Missing OMDB API key');
  }

  const typeParam = type ? `&type=${type}` : '';
  const url = `${BASE_URL}?apikey=${API_KEY}${typeParam}&s=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (response.status === 401) {
    throw new Error('Invalid API key');  // Clarify 401 error
  }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`); 
  }

  const data = await response.json();
  return data;
}
