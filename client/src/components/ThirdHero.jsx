import React from "react";
import { Link } from "react-router-dom";
import "./ThirdHero.css";

const ThirdHero = () => {
  return (
    <section className="third-hero">
      <div className="third-hero__overlay"></div>
      <div className="third-hero__container">
        <div className="third-hero__content">
          <div className="third-hero__greeting">- Welcome to the future -</div>
          <h1 className="third-hero__title">
            <span className="title-line-1">Build Your Dream</span>
            <span className="title-line-2">Career Today</span>
          </h1>
          <p className="third-hero__subtitle">
            Join thousands of professionals who have found their perfect match through our platform.
          </p>
          
          <div className="third-hero__buttons">
            <Link to="/find-jobs" className="btn btn--primary-white">
              Find Your Job
            </Link>
            <Link to="/services" className="btn btn--outline-white">
              Our Services
            </Link>
          </div>
          
          <div className="third-hero__stats">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Jobs Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdHero;
