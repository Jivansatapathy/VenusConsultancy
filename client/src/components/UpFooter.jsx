// client/src/components/UpFooter.jsx
import React from "react";
import "./UpFooter.css";

/**
 * UpFooter - universal CTA band that appears above the main footer.
 *
 * Props:
 *  - heading (string | node) : main headline (supports JSX)
 *  - ctaText (string) : button label
 *  - ctaHref (string) : url the button points to
 *
 * Example:
 *  <UpFooter
 *    heading={<><span>Strengthen your Human Resource</span><br/><span>Strategy with Venus Consultancy</span></>}
 *    ctaText="Get In Touch"
 *    ctaHref="/contact"
 *  />
 */

const UpFooter = ({
  heading = (
    <>
      <span>Strengthen your Human Resource</span>
      <br />
      <span>Strategy with Venus Consultancy</span>
    </>
  ),
  ctaText = "Get In Touch",
  ctaHref = "/contact",
}) => {
  return (
    <section className="vh-upfooter" aria-labelledby="vh-upfooter-heading">
      <div className="vh-upfooter__container">
        <h2 id="vh-upfooter-heading" className="vh-upfooter__heading">
          {heading}
        </h2>

        <a
          className="vh-upfooter__cta"
          href={ctaHref}
          role="button"
          aria-label={`${ctaText} — ${ctaHref}`}
        >
          <span className="vh-upfooter__cta-text">{ctaText}</span>
          <span className="vh-upfooter__cta-circle" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4l8 8-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
      </div>

      {/* purely decorative shapes rendered via pseudo-elements in CSS (no extra DOM) */}
    </section>
  );
};

export default UpFooter;
