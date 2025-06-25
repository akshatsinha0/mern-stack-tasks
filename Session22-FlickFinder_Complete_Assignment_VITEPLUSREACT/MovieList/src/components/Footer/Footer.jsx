import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-content">
          
          <div className="footer-section">
            <h3 className="footer-title">FlickFinder</h3>
            <div className="footer-links">
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About us</a>
              <a href="#contact" className="footer-link">Contact us</a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Products</h3>
            <div className="footer-links">
              <a href="#tv-show" className="footer-link">TV Show</a>
              <a href="#web-series" className="footer-link">Web Series</a>
              <a href="#hollywood" className="footer-link">Hollywood</a>
              <a href="#bollywood" className="footer-link">Bollywood</a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <div className="footer-links">
              <a href="#faqs" className="footer-link">FAQs</a>
              <a href="#search-movie" className="footer-link">Search Movie</a>
            </div>
          </div>

          <div className="footer-section newsletter-section">
            <h3 className="footer-title">Newsletter</h3>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="mail@projectone.com"
                className="newsletter-input"
              />
              <div className="newsletter-checkbox">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">
                  I agree with <a href="#privacy">Privacy Policy</a> and <a href="#terms">Terms of Condition</a>
                </label>
              </div>
              <button className="newsletter-btn">Send</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="https://facebook.com" className="social-link" title="Facebook">
              <img src="/LOGOSINTHEFOOTER/icons8-facebook.svg" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://instagram.com" className="social-link" title="Instagram">
              <img src="/LOGOSINTHEFOOTER/icons8-instagram.svg" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://twitter.com" className="social-link" title="Twitter">
              <img src="/LOGOSINTHEFOOTER/icons8-twitter.svg" alt="Twitter" className="social-icon" />
            </a>
            <a href="https://youtube.com" className="social-link" title="YouTube">
              <img src="/LOGOSINTHEFOOTER/icons8-youtube.svg" alt="YouTube" className="social-icon" />
            </a>
          </div>
          
          <div className="footer-credit">
            <p>© FlickFinder 2024. All rights reserved. Developed by <span className="developer-name">AKSHAT SINHA</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
