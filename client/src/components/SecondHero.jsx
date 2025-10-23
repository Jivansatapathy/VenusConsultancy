import React from "react";
import { Link } from "react-router-dom";
import "./SecondHero.css";
import OptimizedImage from "./OptimizedImage";

const SecondHero = () => {
  return (
    <section className="second-hero">
      <div className="second-hero__container">
        {/* Left side - Text content */}
        <div className="second-hero__left">
          <div className="second-hero__greeting">- Hello and welcome -</div>
          <h1 className="second-hero__title">
            <span className="title-line-1">Start Your Career</span>
            <span className="title-line-2">in Outer Web</span>
          </h1>
          <p className="second-hero__subtitle">
            We are the people who dream & do.
          </p>
          
          <div className="second-hero__buttons">
            <Link to="/about" className="btn btn--primary-green">
              About us
            </Link>
            <Link to="/find-jobs" className="btn btn--outline-white">
              Vacancies
            </Link>
          </div>
          
          <div className="second-hero__hot-vacancies">
            <p className="hot-vacancies-text">
              Hot vacancies : UX Designer, JS Developer, iOS Developer, Product Manager
            </p>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="second-hero__right">
          <div className="second-hero__images">
            <div className="image-stack">
              <div className="hero-image hero-image--top">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face&auto=format&q=80" 
                  alt="Professional woman working" 
                  loading="lazy"
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="hero-image hero-image--middle">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&auto=format&q=80" 
                  alt="Modern office space" 
                  loading="lazy"
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="hero-image hero-image--bottom">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop&auto=format&q=80" 
                  alt="Team collaboration" 
                  loading="lazy"
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondHero;
