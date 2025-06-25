import { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/avatarBGImageForbanner.png',
    '/Beekeper.png',
    '/Nobody.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToMovies = () => {
    document.getElementById('movie-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="banner">
      {slides.map((src, idx) => (
        <div
          key={idx}
          className={`banner-slide ${idx === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6)),url(${src})` }}
        >
          <div className="banner-content">
            <h1 className="banner-title">
              Bringing the Big Screen to Your Screen
            </h1>
            <p className="banner-subtitle">
              Discover, critique, and celebrate movies <br/> with honest reviews and fresh takes on every film
            </p>
            <button className="discover-btn" onClick={scrollToMovies}>
              Discover More..
            </button>
          </div>
        </div>
      ))}

      <div className="banner-controls">
        <button className="banner-nav prev" onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}>
          ❮
        </button>
        <button className="banner-nav next" onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}>
          ❯
        </button>
      </div>

      <div className="banner-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
