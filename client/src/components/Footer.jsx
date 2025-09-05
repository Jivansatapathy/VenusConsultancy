// client/src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="vh-footer u-card" role="contentinfo" aria-label="Site footer">
      <div className="vh-footer__container">
        <div className="vh-footer__brand">
          <img src="/logo.png" alt="Venus Hiring logo" className="vh-footer__logo" />
          <div className="vh-footer__tagline">Hire Smarter. Grow Faster.</div>
        </div>

        <nav className="vh-footer__nav" aria-label="Footer navigation">
          <a href="/" className="vh-footer__link">Home</a>
          <a href="/find-jobs" className="vh-footer__link">Find Jobs</a>
          <a href="/find-talent" className="vh-footer__link">Find Talent</a>
          <a href="/about" className="vh-footer__link">About</a>
          <a href="/contact" className="vh-footer__link">Contact</a>
        </nav>

        <div className="vh-footer__newsletter" aria-labelledby="newsletter-heading">
          <h3 id="newsletter-heading" className="vh-footer__h3">Subscribe</h3>
          <p className="vh-footer__small">Get hiring tips and new jobs in your inbox.</p>

          <form
            className="vh-footer__form"
            onSubmit={(e) => {
              e.preventDefault();
              // Replace with real submit handler
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
          <h3 className="vh-footer__h3">Follow</h3>
          <div className="vh-footer__social-row">
            <a href="https://www.facebook.com" aria-label="Venus Hiring on Facebook" className="vh-footer__social-link">FB</a>
            <a href="https://www.instagram.com" aria-label="Venus Hiring on Instagram" className="vh-footer__social-link">IG</a>
            <a href="https://www.linkedin.com" aria-label="Venus Hiring on LinkedIn" className="vh-footer__social-link">LI</a>
            <a href="mailto:hello@venushiring.com" aria-label="Email Venus Hiring" className="vh-footer__social-link">✉</a>
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
