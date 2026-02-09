// client/src/components/NewHero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSEOContent } from "../context/SEOContentContext";
import "./NewHero.css";

// Vertical Slider Component (Desktop)
const VerticalSlider = ({ images, speed = 30, className = "" }) => {
  return (
    <div className={`vertical-slider ${className}`}>
      <div className="vertical-slider-track" style={{ animationDuration: `${speed}s` }}>
        {images.map((img, index) => (
          <div key={index} className="vertical-slider-item">
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
        {/* Duplicate images for seamless loop */}
        {images.map((img, index) => (
          <div key={`duplicate-${index}`} className="vertical-slider-item">
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile Slider Component (Horizontal)
const MobileSlider = ({ images, speed = 25 }) => {
  return (
    <div className="mobile-slider">
      <div className="mobile-slider-track" style={{ animationDuration: `${speed}s` }}>
        {images.map((img, index) => (
          <div key={index} className="mobile-slider-item">
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
        {/* Duplicate images for seamless loop */}
        {images.map((img, index) => (
          <div key={`duplicate-${index}`} className="mobile-slider-item">
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const NewHero = () => {
  const { content } = useSEOContent();
  const heroContent = content?.home?.hero || {};

  // All available slider images
  const allSliderImages = [
    '/slider/jobfair.jpg',
    '/slider/jobfair1.jpg',
    '/slider/jobfair2.jpg',
    '/slider/jobfair3.jpg',
    '/slider/jobfair4.jpg',
    '/slider/jobfair5.jpg',
    '/slider/laptopjob.jpg',
    '/slider/Venus Consultancy at Job-fair event.jpg',
    '/slider/Team Venus helping at Community Job fair.jpg',
    '/slider/Venus Consultancy at Baltimore US for NMSDC Conference.jpg',
    '/slider/Conference at Harvard Business School.jpg',
    '/slider/Supplier Diversity event at Stellantis.jpg',
    '/slider/Team Venus at US thanks giving dinner at AMCHAM Gala Event.jpg',
    '/Gallery/With Consulate General of US.jpg',
    '/Gallery/With The U.S Ambassador David Cohen.jpg',
    '/Gallery/Meeting with Governor of Michigan Gretchen Whitmer.jpg',
    '/Gallery/Great meeting with Governor of Arizona, Katie Hobbs.jpg',
    '/Gallery/Great Meeting with Governor of Indiana, Eric Holcomb.jpg',
    '/Gallery/Great Meeting with Governor of Maryland Wes Moore.jpg',
    '/Gallery/Great Meeting with Governor of Nevada Lombardo.jpg',
    '/Gallery/Venus Consultancy Sponsor at SELECT USA.jpg'
  ];

  // Split images evenly - half in slider 1, half in slider 2
  const midPoint = Math.ceil(allSliderImages.length / 2);
  const slider1Images = allSliderImages.slice(0, midPoint);
  const slider2Images = allSliderImages.slice(midPoint);

  // Duplicate arrays to create seamless loop
  const slider1Final = [...slider1Images, ...slider1Images];
  const slider2Final = [...slider2Images, ...slider2Images];

  // Mobile slider with all slider images
  const mobileSliderImages = [
    '/slider/jobfair.jpg',
    '/slider/jobfair1.jpg',
    '/slider/jobfair2.jpg',
    '/slider/jobfair3.jpg',
    '/slider/jobfair4.jpg',
    '/slider/jobfair5.jpg',
    '/slider/laptopjob.jpg',
    '/slider/Venus Consultancy at Job-fair event.jpg',
    '/slider/Team Venus helping at Community Job fair.jpg',
    '/slider/Venus Consultancy at Baltimore US for NMSDC Conference.jpg',
    '/slider/Conference at Harvard Business School.jpg',
    '/slider/Supplier Diversity event at Stellantis.jpg',
    '/slider/Team Venus at US thanks giving dinner at AMCHAM Gala Event.jpg',
    '/Gallery/With Consulate General of US.jpg',
    '/Gallery/With The U.S Ambassador David Cohen.jpg',
    '/Gallery/Meeting with Governor of Michigan Gretchen Whitmer.jpg',
    '/Gallery/Great meeting with Governor of Arizona, Katie Hobbs.jpg',
    '/Gallery/Great Meeting with Governor of Indiana, Eric Holcomb.jpg',
    '/Gallery/Great Meeting with Governor of Maryland Wes Moore.jpg',
    '/Gallery/Great Meeting with Governor of Nevada Lombardo.jpg',
    '/Gallery/Venus Consultancy Sponsor at SELECT USA.jpg'
  ];

  return (
    <section className="hero">
      <div className="hero-background"></div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            {heroContent.title}
          </h1>
          <p className="hero-subtitle">
            {heroContent.subtitle || "We unite Technology, Talent, and Opportunities to align your career goals with the perfect job match."}
          </p>
          <div className="hero-buttons">
            <Link
              to={heroContent.button1Link || "/find-jobs"}
              className="btn-hero-primary"
            >
              {heroContent.button1Text || "Find Works"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to={heroContent.button2Link || "/contact"}
              className="btn-hero-secondary"
            >
              {heroContent.button2Text || "Hire Talents Now"}
            </Link>
          </div>
        </div>

        {/* Right Side - Desktop Sliders */}
        <div className="hero-sliders">
          <VerticalSlider images={slider1Final} speed={70} className="slider-1" />
          <VerticalSlider images={slider2Final} speed={70} className="slider-2" />
        </div>

        {/* Mobile Slider */}
        <div className="hero-mobile-slider">
          <MobileSlider images={mobileSliderImages} speed={60} />
        </div>
      </div>
    </section>
  );
};

export default NewHero;

