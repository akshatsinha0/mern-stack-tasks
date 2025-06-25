import { useState, useEffect, useRef } from 'react';
import './Slider.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const sliderImages = [
    {
      src: '/PopcornImage.png',
      title: 'Movie Night Experience',
      description: 'Get ready for the ultimate cinema experience'
    },
    {
      src: '/cinemafestival.jpeg',
      title: 'Cinema Festival',
      description: 'Celebrating the art of filmmaking'
    },
    {
      src: '/anotherbannerimage.png',
      title: 'Premium Entertainment',
      description: 'Quality content for every movie lover'
    },
    {
      src: '/yetanotherbanner.png',
      title: 'Movie Magic',
      description: 'Where stories come to life'
    }
  ];

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div className="slider-section">
      <div 
        className="slider-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="slider-wrapper">
          <div className="slider-track" ref={sliderRef}>
            {sliderImages.map((image, index) => (
              <div key={index} className="slider-slide">
                <img src={image.src} alt={image.title} />
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="slider-nav prev" onClick={handlePrevSlide}>
          <span>❮</span>
        </button>
        <button className="slider-nav next" onClick={handleNextSlide}>
          <span>❯</span>
        </button>

        <div className="slider-indicators">
          {sliderImages.map((_, index) => (
            <button 
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="auto-play-indicator">
          <div className={`play-pause-btn ${isAutoPlaying ? 'playing' : 'paused'}`}>
            {isAutoPlaying ? '⏸️' : '▶️'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
