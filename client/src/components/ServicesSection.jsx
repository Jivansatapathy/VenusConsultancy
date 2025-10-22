// client/src/components/ServicesSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./ServicesSection.css";
import services from "../data/servicesConfig.js";

/**
 * ServicesSection
 * - shows 3 cards at once (3 full cards visible)
 * - clicking next moves by one card to the left (so you see cards 2,3,4 etc.)
 * - centered max-width 1200px
 * - accessible buttons and indicators
 */

const VISIBLE_RATIO = 3; // number of cards visible (3 full cards)
const STEP = 1; // move by 1 card per click

const ServicesSection = () => {
  const { heading, description, items } = services;
  const [index, setIndex] = useState(0); // index of first fully-visible card
  const trackRef = useRef(null);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(320);
  const [gap, setGap] = useState(24);
  // check screen size for responsive behavior
  const [screenSize, setScreenSize] = useState('desktop');
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 480) {
        setScreenSize('mobile');
      } else if (window.innerWidth <= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // adjust maxIndex based on screen size
  const maxIndex = screenSize === 'mobile' 
    ? Math.max(0, items.length - 1) // on mobile, show 1 card per view
    : screenSize === 'tablet'
    ? Math.max(0, items.length - 2) // on tablet, show 2 cards per view
    : Math.max(0, items.length - Math.floor(VISIBLE_RATIO)); // on desktop, use original logic

  // measure card width on mount & resize
  useEffect(() => {
    const measure = () => {
      const cardNode = cardRef.current;
      if (cardNode) {
        const style = getComputedStyle(cardNode);
        const w = cardNode.getBoundingClientRect().width;
        const g = parseFloat(style.marginRight || style.gap || gap) || gap;
        setCardWidth(Math.round(w));
        setGap(g);
      } else {
        setCardWidth(320);
        setGap(gap);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - STEP));
  };

  const goNext = () => {
    setIndex((i) => Math.min(maxIndex, i + STEP));
  };

  // compute translateX in px based on index
  const translateX = -(index * (cardWidth + gap));

  // progress fraction for bottom bar: index / (items.length - visibleFullCount)
  const totalSteps = Math.max(1, items.length - Math.floor(VISIBLE_RATIO) + 1);
  const currentStep = Math.min(index + 1, totalSteps);
  const progressPercent = ((currentStep - 1) / (totalSteps - 1 || 1)) * 100;

  return (
    <section className="vh-services" aria-labelledby="vh-services-heading">
      <div className="vh-services__card">
        <h2 id="vh-services-heading" className="vh-services__heading">
          {heading}
        </h2>
        {description && (
          <p className="vh-services__desc">{description}</p>
        )}

        <div className="vh-services__viewport">
          {/* track wrapper */}
          <div
            className="vh-services__track"
            ref={trackRef}
            style={{
              transform: `translateX(${translateX}px)`,
            }}
            aria-live="polite"
          >
            {items.map((it, i) => (
              <article
                key={it.key || i}
                className="vh-service-card"
                ref={i === 0 ? cardRef : null} // measure first card
              >
                <div className="vh-service-card__media">
                  <img src={it.image} alt={it.title} loading="lazy" decoding="async" />
                </div>
                <div className="vh-service-card__body">
                  <h3 className="vh-service-card__title">{it.title}</h3>
                  <p className="vh-service-card__excerpt">{it.excerpt}</p>
                  <a className="vh-service-card__link" href={it.link} aria-label={`Learn more about ${it.title}`}>
                    <span className="vh-service-card__link-icon">⟶</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop controls with progress bar */}
        {(screenSize === 'desktop') && (
          <div className="vh-services__controls">
            <button
              className="vh-services__arrow"
              onClick={goPrev}
              aria-label="Previous services"
              disabled={index <= 0}
            >
              ‹
            </button>

            <div className="vh-services__pager">
              <span className="vh-services__pager-text">
                {currentStep} / 2 Services
              </span>
              <div
                className="vh-services__progress"
                aria-hidden="true"
              >
                <div
                  className="vh-services__progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              className="vh-services__arrow"
              onClick={goNext}
              aria-label="Next services"
              disabled={index >= maxIndex}
            >
              ›
            </button>
          </div>
        )}

        {/* Mobile and tablet navigation arrows only */}
        {(screenSize === 'mobile' || screenSize === 'tablet') && (
          <div className="vh-services__mobile-controls">
            <button
              className="vh-services__mobile-arrow"
              onClick={goPrev}
              aria-label="Previous services"
              disabled={index <= 0}
            >
              ‹
            </button>

            <button
              className="vh-services__mobile-arrow"
              onClick={goNext}
              aria-label="Next services"
              disabled={index >= maxIndex}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;