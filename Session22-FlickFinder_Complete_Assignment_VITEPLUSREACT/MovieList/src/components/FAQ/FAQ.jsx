import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'What is this website about?',
    answer: 'This website provides in-depth reviews, ratings, and analysis of movies from different genres, release periods, and countries. You\'ll find user submitted reviews, critic opinions, and recommendations for all types of films.'
  },
  {
    question: 'How are movies rated?',
    answer: 'Our rating system combines user scores, critic reviews, and algorithmic analysis for a balanced score.'
  },
  {
    question: 'Can I submit my own reviews?',
    answer: 'Yes, once logged in you can post your own reviews, rate movies, and engage with the community.'
  },
  {
    question: 'Is all content free?',
    answer: 'Absolutely—browsing, searching, and reading reviews are entirely free for all users.'
  },
  {
    question: 'How do I search for a specific movie?',
    answer: 'Use the search bar in the Movie List section; type a title or use voice search for instant suggestions.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <img
            src="/FREQUENTLYASKEDQUESTIONSTEXT.png"
            alt="Frequently Asked Questions"
            className="faq-title-img"
          />
        </div>
        <div className="faq-list">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item ${activeIndex === idx ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(idx)}
                aria-expanded={activeIndex === idx}
              >
                <span className="question-number">{idx + 1}.</span>
                <span className="question-text">{item.question}</span>
                <span className="faq-toggle">
                  <span className="toggle-icon">
                    {activeIndex === idx ? '⊖' : '⊕'}
                  </span>
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
