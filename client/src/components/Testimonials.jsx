// client/src/components/Testimonials.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Testimonials.css";
import testimonials from "../data/testimonialsConfig.js";

const ROTATION_TIME = 4000; // 4 seconds

const Testimonials = () => {
  const { heading, subheading, items } = testimonials;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length);
    setProgress(0); // reset loader
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
    setProgress(0);
  };

  // Main timer loop
  useEffect(() => {
    const step = 100; // ms
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const nextProgress = p + (step / ROTATION_TIME) * 100;
        if (nextProgress >= 100) {
          next();
          return 0;
        }
        return nextProgress;
      });
    }, step);

    return () => clearInterval(timerRef.current);
  }, [index]);

  return (
    <section className="vh-testimonials" aria-labelledby="vh-testimonials-heading">
      <div className="vh-testimonials__container">
        <h2 id="vh-testimonials-heading" className="vh-testimonials__heading">
          {heading}
        </h2>
        <p className="vh-testimonials__sub">{subheading}</p>

        {/* Carousel */}
        <div className="vh-testimonials__carousel">
          {items.map((t, i) => (
            <div
              key={i}
              className={`vh-testimonial-card ${i === index ? "active" : "inactive"}`}
              aria-hidden={i !== index}
            >
              <blockquote className="vh-testimonial-quote">“{t.quote}”</blockquote>
              <div className="vh-testimonial-profile">
                <img
                  src={t.avatar}
                  alt="Company logo"
                  className="vh-testimonial-avatar"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="vh-testimonial-avatar-fallback"
                  style={{ 
                    display: 'none',
                    width: '60px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}
                >
                  LOGO
                </div>
                <div>
                  <div className="vh-testimonial-title">{t.title}</div>
                </div>
              </div>

              {/* Progress circle */}
              {i === index && (
                <div className="vh-testimonial-progress">
                  <svg className="progress-ring" viewBox="0 0 36 36">
                    <path
                      className="progress-ring__bg"
                      d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                    />
                    <path
                      className="progress-ring__fg"
                      strokeDasharray="100, 100"
                      strokeDashoffset={100 - progress}
                      d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="vh-testimonials__controls">
          <button
            className="vh-testimonial-btn"
            aria-label="Previous testimonial"
            onClick={prev}
          >
            ‹
          </button>
          <button
            className="vh-testimonial-btn"
            aria-label="Next testimonial"
            onClick={next}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
