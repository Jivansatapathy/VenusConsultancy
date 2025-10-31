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
            <div className="third-hero__greeting">- Welcome to the future -</div>
            <h1 className="third-hero__title">
              <span className="title-line-1">Build Your Dream</span>
              <span className="title-line-2">Career Today</span>
            </h1>
            <p className="third-hero__subtitle">
              Join thousands of professionals who have found their perfect match through our platform.
            </p>
            
            <div className="third-hero__buttons">
              <Link to="/find-jobs" className="btn btn--primary-dark">
                Find Your Job
              </Link>
              <Link to="/services" className="btn btn--outline-dark">
                Our Services
              </Link>
            </div>
            
            <div className="third-hero__stats">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Jobs Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
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
