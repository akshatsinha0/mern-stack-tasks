import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearchSubmit();
  };

  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" onClick={onSearchSubmit} />
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search here."
        className="search-input"
      />
      <FaMicrophone className="mic-icon" />
    </div>
  );
};

export default SearchBar;
