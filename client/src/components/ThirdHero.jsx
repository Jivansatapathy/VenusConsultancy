import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import "./ThirdHero.css";

const ThirdHero = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load the Lottie animation
    const loadLottieAnimation = async () => {
      try {
        const response = await fetch('/job-hunting.json');
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      }
    };

    loadLottieAnimation();
  }, []);

  return (
    <section className="third-hero">
      <div className="third-hero__container">
        <div className="third-hero__content">
          <div className="third-hero__left">
            <div className="third-hero__greeting">- Empower Your Workforce -</div>
            <h1 className="third-hero__title">
              <span className="title-line-1">Shape the Future of</span>
              <span className="title-line-2">Your Organization Today</span>
            </h1>
            <p className="third-hero__subtitle">
            Connect with top-tier talent across the USA and discover professionals who drive growth, innovation, and success for American businesses.
            </p>
            
            <div className="third-hero__buttons">
              <Link to="/book-call" className="btn btn--primary-dark">
                Book a Consultation
              </Link>
              <Link to="/services" className="btn btn--outline-dark">
                Our Services
              </Link>
            </div>
          </div>
          
          <div className="third-hero__right">
            <div className="lottie-container">
              {animationData ? (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    margin: 0,
                    padding: 0,
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <div className="lottie-placeholder">
                  <p>Loading animation...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdHero;
