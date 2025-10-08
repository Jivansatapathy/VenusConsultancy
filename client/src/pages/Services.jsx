// client/src/pages/Services.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { jobRolesData } from "../data/jobRolesData";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();
  
  // Aurora background for mobile/tablet hero
  const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    const controls = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    company: '',
    rating: 5,
    review: ''
  });

  // Handler functions
  const handleFindTalents = () => {
    navigate('/contact');
  };

  const handleWriteReview = () => {
    setShowReviewModal(true);
  };

  const handleCreateJobListing = () => {
    const phoneNumber = "+16477616277";
    const message = "Hello! I would like to create a job listing on Venus Hiring.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit review to backend
      const reviewData = {
        ...reviewForm,
        rating: parseInt(reviewForm.rating),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // For now, we'll store in localStorage as a demo
      // In production, this would be sent to your backend API
      const existingReviews = JSON.parse(localStorage.getItem('venus_reviews') || '[]');
      const newReview = {
        _id: Date.now().toString(),
        ...reviewData
      };
      existingReviews.push(newReview);
      localStorage.setItem('venus_reviews', JSON.stringify(existingReviews));
      
      console.log('Review submitted:', newReview);
      alert('Thank you for your review! It will be reviewed and may appear on our website.');
      setShowReviewModal(false);
      setReviewForm({ name: '', company: '', rating: 5, review: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const services = [
    {
      title: "Pharmaceutical & Life Science",
      links: [
        "Sales",
        "Marketing", 
        "Market Research",
        "Regulatory Affairs",
        "Supply Chain Management",
        "Clinical Trials Assistant",
        "Clinical Research",
        "Business Development",
        "Legal",
        "Chemical Engineering",
        "Laboratory Support",
        "Quality Control",
      ],
    },
    {
      title: "C-suite Executive Search",
      links: [
        "Board Search",
        "Chief Executive Officer (CEO)",
        "Chief Financial Officer (CFO)",
        "Chief Operations Officer (COO)",
        "Chief Marketing Officer (CMO)",
        "Chief Technology Officer (CTO)",
        "Chief Information Officer (CIO)",
        "Chief Human Resources Officer (CHRO)",
        "Chief Risk Officer (CRO)",
        "Chief Strategy Officer (CSO)",
      ],
    },
    {
      title: "Aerospace",
      links: [
        "Control System Engineer",
        "Software Quality Engineer",
        "System Engineer",
        "Technical Project Manager",
        "Embedded Software Engineer",
        "Aerospace Engineer",
        "Flight Test Engineer",
        "Avionics Engineer",
        "Structural Engineer",
        "Propulsion Engineer",
        "Systems Integration Engineer",
        "DO-178 Certification Experts",
      ],
    },
    {
      title: "Pharmaceutical & Life Science",
      links: [
        "Sales",
        "Marketing",
        "Market Research",
        "Regulatory Affairs",
        "Supply Chain Management",
        "Clinical Trials Assistant",
        "Clinical Research",
        "Business Development",
        "Legal",
        "Chemical Engineering",
        "Laboratory Support",
        "Quality Control",
        "Pharmacology",
      ],
    },
    {
      title: "C-suite Executive Search",
      links: [
        "Board Search",
        "Chief Executive Officer (CEO)",
        "Chief Financial Officer (CFO)",
        "Chief Operations Officer (COO)",
        "Chief Marketing Officer (CMO)",
        "Chief Revenue Officer (CRO)",
        "Chief Information Officer (CIO)",
        "Chief Technical Officer (CTO)",
        "Chief Human Resources Officer (CHRO)",
        "General Manager",
        "Country Manager",
      ],
    },
    {
      title: "AutoTech",
      links: [
        "Software Testing",
        "Embedded Software Developer",
        "Technical Project Manager",
        "Validation, Verification & Integration Testing",
        "Autonomous Vehicle System",
        "ADAS Engineers",
        "Mechanical Developers",
        "Software/Hardware Design",
        "Embedded Developers",
        "QA Engineers",
        "FuSa / Cybersecurity",
        "Infotainment Developers",
      ],
    },
    {
      title: "Manufacturing & Skilled Trade",
      links: [
        "Engineering",
        "Manufacturing",
        "Supply Chain",
        "Logistics",
        "Transportation",
        "Construction",
        "Procurement",
        "3PL",
        "Health & Safety",
        "Quality",
        "Production",
        "Distribution",
        "Trades",
        "Lean Six Sigma",
        "Warehousing",
        "Project Management",
        "Process Improvement",
        "Business & Strategic Planning",
        "Facilities Management",
        "Pharmaceuticals",
        "Consumer Packaged Goods",
        "Industrial",
        "Life Sciences",
      ],
    },
    {
      title: "Accounting & Back Office Outsourcing",
      links: [
        "CFO",
        "VP Finance",
        "Controller",
        "AP / AR Clerk",
        "Staff Accountant",
        "Intermediate Accountant",
        "Accounting Technician",
        "Sr. Accountant",
        "Sr. Accountant — Audit & Assurance",
        "Manager — Audit & Assurance",
        "Sr. Manager — Audit & Assurance",
        "Tax Technician",
        "Sr. Accountant — Tax",
        "Tax Specialist",
        "Manager — Tax",
        "Sr. Manager — Tax",
        "Valuations Specialist",
        "Manager — Valuations",
        "Sr. Manager — Valuations",
        "Manager — Professional Services",
        "Sr. Manager — Professional Services",
        "Tax Partner",
        "Audit Partner",
      ],
    },
  ];

  const ServiceCard = ({ title, links }) => {
    const [expanded, setExpanded] = React.useState(false);
    const visible = expanded ? links : links.slice(0, 5);
    const hasMore = links.length > 5;

    // Function to find the job role key from the role name
    const getJobRoleKey = (roleName) => {
      // Try to find exact match first
      for (const [key, jobData] of Object.entries(jobRolesData)) {
        if (jobData.title === roleName) {
          return key;
        }
      }
      
      // Try partial matches for common variations
      const lowerRoleName = roleName.toLowerCase();
      for (const [key, jobData] of Object.entries(jobRolesData)) {
        const lowerTitle = jobData.title.toLowerCase();
        if (lowerTitle.includes(lowerRoleName) || lowerRoleName.includes(lowerTitle)) {
          return key;
        }
      }
      
      return null; // No match found
    };

    // Icon mapping for each service
    const getServiceIcon = (serviceTitle) => {
      const icons = {
        "Pharmaceutical & Life Science": (
          <svg viewBox="0 0 24 24" fill="currentColor" className="service-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"/>
          </svg>
        ),
        "C-suite Executive Search": (
          <svg viewBox="0 0 24 24" fill="currentColor" className="service-icon">
            <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4ZM16 6C14.9 6 14 6.9 14 8S14.9 10 16 10 18 9.1 18 8 17.1 6 16 6ZM8 4C10.2 4 12 5.8 12 8S10.2 12 8 12 4 10.2 4 8 5.8 4 8 4ZM8 6C6.9 6 6 6.9 6 8S6.9 10 8 10 10 9.1 10 8 9.1 6 8 6ZM16 14C18.2 14 20 15.8 20 18V20H12V18C12 15.8 13.8 14 16 14ZM8 14C10.2 14 12 15.8 12 18V20H4V18C4 15.8 5.8 14 8 14Z"/>
          </svg>
        ),
        "AutoTech": (
          <svg viewBox="0 0 24 24" fill="currentColor" className="service-icon">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 6.5H17.5L19 12H5L6.5 6.5ZM7 13.5C7.83 13.5 8.5 14.17 8.5 15S7.83 16.5 7 16.5 5.5 15.83 5.5 15 6.17 13.5 7 13.5ZM17 13.5C17.83 13.5 18.5 14.17 18.5 15S17.83 16.5 17 16.5 15.5 15.83 15.5 15 16.17 13.5 17 13.5Z"/>
          </svg>
        ),
        "Manufacturing & Skilled Trade": (
          <svg viewBox="0 0 24 24" fill="currentColor" className="service-icon">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.5L19.5 8V16L12 19.5L4.5 16V8L12 4.5ZM12 6L6 9V15L12 18L18 15V9L12 6Z"/>
            <path d="M8 10H16V12H8V10ZM8 14H16V16H8V14Z"/>
          </svg>
        ),
        "Accounting & Back Office Outsourcing": (
          <svg viewBox="0 0 24 24" fill="currentColor" className="service-icon">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
            <path d="M9 8H15V10H9V8ZM9 12H15V14H9V12Z"/>
          </svg>
        ),
        "Aerospace": (
          <svg viewBox="0 0 24 24" fill="currentColor" className="service-icon">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.5L19.5 8V16L12 19.5L4.5 16V8L12 4.5ZM12 6L6 9V15L12 18L18 15V9L12 6Z"/>
            <path d="M8 10H16V12H8V10ZM8 14H16V16H8V14Z"/>
          </svg>
        )
      };
      return icons[serviceTitle] || (
        <svg viewBox="0 0 24 24" fill="currentColor" className="service-icon">
          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z"/>
        </svg>
      );
    };

    return (
      <article className="svc-card">
        <div className="svc-card__icon" aria-hidden="true">
          {getServiceIcon(title)}
        </div>
        <h3 className="svc-card__title">{title}</h3>
        <ul className="svc-card__links">
          {visible.map((label) => {
            const jobRoleKey = getJobRoleKey(label);
            return jobRoleKey ? (
              <li key={label}>
                <Link to={`/hiring/${jobRoleKey}`} className="svc-card__link">
                  {label}
                </Link>
              </li>
            ) : (
              <li key={label}>{label}</li>
            );
          })}
        </ul>
        {hasMore && (
          <button className="svc-card__toggle" type="button" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </article>
    );
  };
  return (
    <main className="services-page">
      {/* Desktop/Laptop hero (hidden on tablet/mobile) */}
      <header className="svc-hero" role="banner">
        <div className="svc-container">
          <div className="svc-hero__grid" aria-label="Hero two column layout">
            <div className="svc-hero__left">
              <h1 className="svc-hero__title">Your partner in hiring the right talent for every role.</h1>
              <div className="svc-hero__ctas" role="group" aria-label="Primary actions">
                <a className="btn btn--primary" href="/contact">Contact Us</a>
                <a className="btn btn--outline1" href="#services">Browse on your own</a>
              </div>
            </div>

            <div className="svc-hero__right" aria-hidden="false">
              <video 
                className="hero-video" 
                autoPlay 
                muted 
                loop 
                playsInline
                controls
                aria-label="Services video presentation"
              >
                <source src="/images/ven01.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </header>

      {/* Tablet/Mobile hero (hidden on desktop/laptop) */}
      <header className="svc-hero-mobile" role="banner" aria-label="Services hero (mobile/tablet)">
        <div className="svc-hero-mobile__container">
          {/* Animated aurora background layer (behind content) */}
          <motion.div
            className="svc-hero-mobile__bg"
            style={{ backgroundImage }}
            aria-hidden
          />
          <div className="svc-hero-mobile__content">
            <h1 className="svc-hero-mobile__title">Your partner in hiring the right talent for every role.</h1>
            <p className="svc-hero-mobile__sub">Whatever your hiring challenge, explore our talent solutions to find the right professionals across 2,000+ specialized roles.</p>
            <div className="svc-hero-mobile__ctas" role="group" aria-label="Primary actions">
              <a className="btn btn--primary" href="/contact">Contact Us</a>
              <a className="btn btn--outline-invert" href="#services">Browse on your own</a>
            </div>
          </div>
        </div>
      </header>

      <div className="svc-divider" aria-hidden="true" />

      <section id="services" className="svc-services" aria-labelledby="svc-services-title">
        <div className="svc-container">
          <div className="svc-services__head">
            <h2 id="svc-services-title" className="svc-services__title">The perfect partner for your hiring needs</h2>
            <p className="svc-services__sub">Whatever your hiring challenge, explore our talent solutions to find the right professionals across 2,000+ specialized roles.</p>
          </div>

          <div className="svc-cards">
            {services.map((c) => (
              <ServiceCard key={c.title} title={c.title} links={c.links} />
            ))}
          </div>

        </div>


      {/* New Talent Discovery Section */}
      <section className="talent-discovery">
        {/* Red Banner Section */}
        <div className="talent-banner">
          <div className="svc-container">
            <div className="talent-banner__grid">
              <div className="talent-banner__left">
                <h2 className="talent-banner__title">
                  Share your talent needs. Connect with qualified professionals within minutes.
                </h2>
                <p className="talent-banner__subtitle">
                  Tell us about your company and hiring goals<br />
                  to generate a custom Talent Brief in minutes.
                </p>
                <button className="talent-banner__cta" onClick={handleFindTalents}>Find Talents</button>
              </div>
              <div className="talent-banner__right">
                <img 
                  src="/images/iamge01.png" 
                  alt="Project Brief" 
                  className="talent-banner__image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

      </section>
              {/* Trusted-by / Testimonial Hero Section (placed right after talent body) */}
              <section className="trusted-hero" aria-labelledby="trusted-hero-title">
          <div className="svc-container">
            <div className="trusted-card">
              <header className="trusted-head">
                <h2 id="trusted-hero-title" className="trusted-title">Join leaders who choose Venus Hiring to power their hiring success.</h2>
                <p className="trusted-sub">Explore our talent marketplace and see why leaders trust us to hire the right people.</p>
              </header>

              <div className="trusted-logos" role="list" aria-label="Client logos">
                <div className="trusted-logo" aria-label="IBM logo placeholder">IBM</div>
                <div className="trusted-logo" aria-label="eBay logo placeholder">eBay</div>
                <div className="trusted-logo" aria-label="Delta logo placeholder">Delta</div>
                <div className="trusted-logo" aria-label="Mastercard logo placeholder">Mastercard</div>
                <div className="trusted-logo" aria-label="Comedy Central logo placeholder">Comedy Central</div>
                <div className="trusted-logo" aria-label="HelloFresh logo placeholder">HelloFresh</div>
              </div>

              <div className="trusted-divider" aria-hidden="true">
                <span className="trusted-quote">“</span>
              </div>

              <div className="trusted-testimonial">
                <p className="trusted-quote-text">Finding the right talent became effortless with Venus Hiring. It cut down our hiring time and optimized our resources.</p>
                <div className="trusted-meta">
                  <span className="meta-icon" aria-hidden="true" />
                  <span className="meta-text">Six Industries</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Testimonial Review Section */}
      <section className="testimonial-review" aria-labelledby="testimonial-review-title">
        <div className="testimonial-review__bg" />
        <div className="svc-container">
          <div className="testimonial-review__content">
            <div className="testimonial-review__cubes testimonial-review__cubes--top" aria-hidden="true">
              <div className="cube-placeholder" />
            </div>
            <div className="testimonial-review__cubes testimonial-review__cubes--bottom" aria-hidden="true">
              <div className="cube-placeholder" />
            </div>

            <div className="star-rating" aria-hidden="true" role="img" aria-label="5 star rating">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <h2 id="testimonial-review-title" className="testimonial-review__title">
              Share your success story and help companies hire with confidence.
            </h2>
            <p className="testimonial-review__text">
              Leave a review of the talent you've hired through Venus Hiring. Your feedback not only makes your voice heard but also helps other companies hire with confidence, saving them valuable time and resources.
            </p>
            <button className="testimonial-review__btn" type="button" onClick={handleWriteReview}>Write a Review</button>
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="cta-section" aria-labelledby="cta-section-title">
        <div className="cta-section__bg" />
        <div className="svc-container">
          <div className="cta-section__content">
            <div className="cta-text">
              <p className="cta-kicker">Want to build a stronger team?</p>
              <h2 id="cta-section-title" className="cta-headline">
                Connect with your next talent on Venus
              </h2>
              <p className="cta-description">
                Get in front of thousands of companies actively hiring through the leading global talent marketplace.
              </p>
              <button className="cta-button" type="button" onClick={handleCreateJobListing}>Create a Job Listing</button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="review-modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal__header">
              <h3>Write a Review</h3>
              <button 
                className="review-modal__close" 
                onClick={() => setShowReviewModal(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="review-modal__form">
              <div className="review-modal__field">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="review-modal__field">
                <label htmlFor="company">Company Name *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={reviewForm.company}
                  onChange={handleReviewChange}
                  required
                  placeholder="Enter your company name"
                />
              </div>

              <div className="review-modal__field">
                <label htmlFor="rating">Rating *</label>
                <select
                  id="rating"
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleReviewChange}
                  required
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                  <option value={3}>⭐⭐⭐ (3 stars)</option>
                  <option value={2}>⭐⭐ (2 stars)</option>
                  <option value={1}>⭐ (1 star)</option>
                </select>
              </div>

              <div className="review-modal__field">
                <label htmlFor="review">Your Review *</label>
                <textarea
                  id="review"
                  name="review"
                  value={reviewForm.review}
                  onChange={handleReviewChange}
                  required
                  rows={4}
                  placeholder="Share your experience with Venus Hiring..."
                />
              </div>

              <div className="review-modal__actions">
                <button 
                  type="button" 
                  className="review-modal__cancel"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="review-modal__submit">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
};

export default Services;
