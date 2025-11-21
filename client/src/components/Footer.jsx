// client/src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {

  return (
    <footer className="vh-footer u-card" role="contentinfo" aria-label="Site footer">
      <div className="vh-footer__container">
        {/* Column 1: Brand & Description */}
        <div className="vh-footer__column vh-footer__brand-section">
          <div className="vh-footer__brand">
            <img src="/venuslogo.png" alt="Venus Hiring logo" className="vh-footer__logo" />
            <div className="vh-footer__tagline">Hire Smarter. Grow Faster.</div>
          </div>
          <p className="vh-footer__desc-text">
            Venus Consultancy connects exceptional talent with forward-thinking companies across the USA. We help businesses find the right people and professionals discover their next opportunity.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="vh-footer__column vh-footer__links-section">
          <h3 className="vh-footer__column-title">Quick Links</h3>
          <nav className="vh-footer__nav" aria-label="Footer navigation">
            <a href="/" className="vh-footer__link">Home</a>
            <a href="/find-jobs" className="vh-footer__link">Find Jobs</a>
            <a href="/services" className="vh-footer__link">Services</a>
            <a href="/about" className="vh-footer__link">About</a>
            <a href="/contact" className="vh-footer__link">Contact</a>
          </nav>
        </div>

        {/* Column 3: Contact Info */}
        <div className="vh-footer__column vh-footer__contact-section">
          <h3 className="vh-footer__column-title">Contact Us</h3>
          <div className="vh-footer__contact-info">
            <div className="vh-footer__contact-item">
              <span className="vh-footer__contact-label">Email:</span>
              <a href="mailto:info@venushiring.com" className="vh-footer__contact-link">info@venushiring.com</a>
            </div>
            <div className="vh-footer__contact-item">
              <span className="vh-footer__contact-label">Phone:</span>
              <a href="tel:248-275-1077" className="vh-footer__contact-link">248-275-1077</a>
            </div>
            <div className="vh-footer__location">
              <p className="vh-footer__location-title">USA Office</p>
              <p className="vh-footer__location-address">225 – 880 W Long Lake Road</p>
              <p className="vh-footer__location-address">Troy, MI 48098</p>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter & Social */}
        <div className="vh-footer__column vh-footer__newsletter-section">
          <h3 className="vh-footer__column-title">Stay Connected</h3>
          <div className="vh-footer__newsletter" aria-labelledby="newsletter-heading">
            <p className="vh-footer__small">Get hiring tips and new jobs in your inbox.</p>
            <form
              className="vh-footer__form"
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.elements.email.value.trim();
                if (email) alert(`Thanks — we'll send updates to ${email}`);
                e.target.reset();
              }}
              aria-label="Subscribe to Venus Hiring newsletter"
            >
              <label htmlFor="footer-email" className="vh-footer__sr">Email address</label>
              <div className="vh-footer__form-row">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="vh-footer__input"
                  aria-required="true"
                />
                <button type="submit" className="btn btn--primary vh-footer__submit">Subscribe</button>
              </div>
            </form>
          </div>
          <div className="vh-footer__social" aria-label="Social links">
            <div className="vh-footer__social-row">
              <a href="https://www.facebook.com/venushiring" aria-label="Venus Hiring on Facebook" className="vh-footer__social-link">FB</a>
              <a href="https://www.instagram.com/venushiring" aria-label="Venus Hiring on Instagram" className="vh-footer__social-link">IG</a>
              <a href="https://www.linkedin.com/company/the-venus-consultancy-ltd/" aria-label="Venus Hiring on LinkedIn" className="vh-footer__social-link">LI</a>
            </div>
          </div>
        </div>
      </div>

      <div className="vh-footer__bottom">
        <p className="vh-footer__copyright">© {new Date().getFullYear()} Venus Hiring — All rights reserved.</p>
        <div className="vh-footer__legal">
          <a href="/terms" className="vh-footer__legal-link">Terms</a>
          <a href="/privacy" className="vh-footer__legal-link">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
