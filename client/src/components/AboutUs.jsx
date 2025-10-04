import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import { ArrowRight, Linkedin, Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutUs() {
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Images using online placeholders
  const slides = [
    {
      id: 1,
      src: "/images/imagetrail/image1.jpg",
      alt: "Venus Hiring Team"
    },
    {
      id: 2,
      src: "/images/imagetrail/image2.jpg",
      alt: "Office Environment"
    },
    {
      id: 3,
      src: "/images/imagetrail/image3.jpg",
      alt: "Team Collaboration"
    },
    {
      id: 4,
      src: "/images/imagetrail/image4.jpg",
      alt: "Professional Meeting"
    },
    {
      id: 5,
      src: "/images/imagetrail/image5.jpg",
      alt: "Creative Workspace"
    },
    {
      id: 6,
      src: "/images/imagetrail/image6.jpg",
      alt: "Team Building"
    },
    {
      id: 7,
      src: "/images/imagetrail/image7.jpg",
      alt: "Office Space"
    },
    {
      id: 8,
      src: "/images/imagetrail/image8.jpg",
      alt: "Work Culture"
    },
    {
      id: 9,
      src: "/images/imagetrail/image9.jpg",
      alt: "Company Values"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="about">
      <div className="about__container">
        {/* Left */}
        <div className="about__left">
          <h2 className="about__title">
            Building careers. Building
            <br /> organisations.
          </h2>

          <p className="about__subtitle">
            Venus Hiring is a recruitment and talent advisory firm helping
            startups, SMEs, and enterprises hire smarter. We connect high-impact
            talent to fast-growing teams across India and beyond.
          </p>

          <div className="about__ctaRow">
            <a href="/contact" className="about__cta">
              <span>Get In Touch</span>
              <span className="about__ctaIcon">
                <ArrowRight size={20} />
              </span>
            </a>

            <div className="about__socials">
              <a 
                href="https://www.linkedin.com/company/the-venus-consultancy-ltd/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="about__social-link"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="https://www.facebook.com/venushiring" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="about__social-link"
              >
                <Facebook size={22} />
              </a>
              <a 
                href="https://www.instagram.com/venushiring?igsh=MTFyYTMycDlkcXh4NQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="about__social-link"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Right (media card) */}
        <div className="about__right">
          <div className="about__mediaWrap">
            {/* Slideshow container */}
            <div className="about__slideshow">
              {/* Navigation arrows */}
              <button 
                className="about__nav about__nav--prev" 
                onClick={goToPrevious}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="about__nav about__nav--next" 
                onClick={goToNext}
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>

              {/* Slides container */}
              <div className="about__slides">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`about__slide ${index === currentSlide ? 'active' : ''}`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="about__img"
                    />
                  </div>
                ))}
              </div>

              {/* Play/Pause button */}
              <button 
                className="about__playPause" 
                onClick={toggleAutoPlay}
                aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlaying ? '⏸️' : '▶️'}
              </button>
            </div>

            {/* Dots navigation */}
            <div className="about__dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`about__dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
