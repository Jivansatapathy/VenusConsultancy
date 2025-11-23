// client/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="vh-footer" role="contentinfo" aria-label="Site footer">
      <div className="vh-footer__container">
        {/* Top Section - Links */}
        <div className="vh-footer__top">
          {/* Quick Links */}
          <div className="vh-footer__column">
            <h3 className="vh-footer__column-title">Quick Links</h3>
            <nav className="vh-footer__nav" aria-label="Quick Links">
              <Link to="/" className="vh-footer__link">Home</Link>
              <Link to="/services" className="vh-footer__link">Services</Link>
              <Link to="/about" className="vh-footer__link">About</Link>
              <Link to="/contact" className="vh-footer__link">Contact</Link>
              <Link to="/find-jobs" className="vh-footer__link">Careers</Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="vh-footer__column">
            <h3 className="vh-footer__column-title">Connect</h3>
            <nav className="vh-footer__nav" aria-label="Social Links">
              <a href="https://www.linkedin.com/company/the-venus-consultancy-ltd/" target="_blank" rel="noopener noreferrer" className="vh-footer__link">LinkedIn</a>
              <a href="https://www.facebook.com/venushiring" target="_blank" rel="noopener noreferrer" className="vh-footer__link">Facebook</a>
              <a href="https://www.instagram.com/venushiring?igsh=MTFyYTMycDlkcXh4NQ==" target="_blank" rel="noopener noreferrer" className="vh-footer__link">Instagram</a>
            </nav>
          </div>

          {/* Legal */}
          <div className="vh-footer__column">
            <h3 className="vh-footer__column-title">Legal</h3>
            <nav className="vh-footer__nav" aria-label="Legal Links">
              <Link to="/privacy" className="vh-footer__link">Privacy Policy</Link>
              <Link to="/terms" className="vh-footer__link">Terms of Service</Link>
              <Link to="/disclaimer" className="vh-footer__link">Disclaimer</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="vh-footer__column">
            <h3 className="vh-footer__column-title">Contact</h3>
            <div className="vh-footer__contact">
              <div className="vh-footer__contact-item">
                <p className="vh-footer__contact-label">USA Office</p>
                <p className="vh-footer__contact-text">225 – 880 W Long Lake Road</p>
                <p className="vh-footer__contact-text">Troy, MI 48098</p>
              </div>
              <div className="vh-footer__contact-item">
                <p className="vh-footer__contact-label">Email</p>
                <a href="mailto:info@venushiring.com" className="vh-footer__contact-link">info@venushiring.com</a>
              </div>
              <div className="vh-footer__contact-item">
                <p className="vh-footer__contact-label">Phone</p>
                <a href="tel:248-275-1077" className="vh-footer__contact-link">248-275-1077</a>
              </div>
            </div>
          </div>

          {/* Login Button Column */}
          <div className="vh-footer__column vh-footer__login-column">
            <Link to="/login" className="vh-footer__login-btn">Login</Link>
          </div>
        </div>
      </div>

      {/* Bottom Section - Logo and Copyright */}
      <div className="vh-footer__bottom">
        <div className="vh-footer__bottom-logo">
          <img src="/venuslo.png" alt="Venus Hiring logo" className="vh-footer__logo-img" />
        </div>
        <p className="vh-footer__copyright">
          © {new Date().getFullYear()} Venus Hiring. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
