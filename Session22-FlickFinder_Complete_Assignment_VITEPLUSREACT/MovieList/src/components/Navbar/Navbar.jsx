import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isFav, setIsFav] = useState(false);

  return (
    <nav className="navbar baloo-2-semibold">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img
            src="/flickfinderlogo.png"
            alt="FlickFinder"
            className="navbar-logo"
          />
        </div>
        <div className="navbar-links">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#tv-show" className="nav-link">Tv Show</a>
          <a href="#movie" className="nav-link">Movie</a>
          <a href="#upcoming" className="nav-link">Upcoming</a>
        </div>
        <button
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={() => setIsFav(!isFav)}
          aria-label="Toggle Favorite"
        >
          <span className="icon-wrapper">
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </span>
          <span className="btn-text">Favorite</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
