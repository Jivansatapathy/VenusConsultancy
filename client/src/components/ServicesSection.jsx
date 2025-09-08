// client/src/components/services/ServiceSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./ServicesSection.css";

/**
 * Props:
 *  - service: object from servicesData
 *  - index: number (0-based) to render badge
 */
const ServiceSection = ({ service, index }) => {
  const { id, title, subtitle, description, bullets = [], roles = [], image, color = "#e50914" } = service;

  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    // measure inner content for expand animation
    setContentHeight(contentRef.current.scrollHeight);
  }, [expanded]);

  const toggle = () => setExpanded((s) => !s);

  const badgeText = String(index + 1).padStart(2, "0");

  return (
    <section id={id} className="svc-section" aria-labelledby={`svc-${id}-title`}>
      <div className="svc-section__inner u-container">
        <div className="svc-section__row">
          {/* left - image + badge */}
          <div className="svc-section__left">
            <div className="svc-section__badge" style={{ background: color }} aria-hidden="true">
              {badgeText}
            </div>
            <div className="svc-section__image">
              <img src={image || "/illustrations/serviceshero-1.png"} alt={`${title} illustration`} loading="lazy" decoding="async" />
            </div>
          </div>

          {/* right - text + short CTA */}
          <div className="svc-section__right">
            <div className="svc-section__meta">
              {subtitle && <div className="svc-section__subtitle">{subtitle}</div>}
            </div>

            <h2 id={`svc-${id}-title`} className="svc-section__title">{title}</h2>

            <p className="svc-section__desc">{description}</p>

            <div className="svc-section__actions">
              <button
                className="btn btn--primary"
                aria-expanded={expanded}
                aria-controls={`svc-${id}-more`}
                onClick={toggle}
              >
                {expanded ? "Show less" : "Know More"}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable block (roles, bullets, CTAs) */}
        <div
          id={`svc-${id}-more`}
          className="svc-section__more"
          role="region"
          aria-hidden={!expanded}
          style={expanded ? { maxHeight: `${contentHeight}px` } : { maxHeight: 0 }}
        >
          <div ref={contentRef} className="svc-section__more-inner">
            {/* Roles grid */}
            {roles && roles.length > 0 && (
              <>
                <h3 className="svc-section__more-title">Roles We Hire For</h3>
                <div className="svc-section__roles" role="list">
                  {roles.map((r, idx) => (
                    <div key={r + idx} className="svc-role">
                      <div className="svc-role__avatar" aria-hidden="true" />
                      <div className="svc-role__label">{r}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Bullets */}
            {bullets && bullets.length > 0 && (
              <>
                <h4 className="svc-section__more-title">What we do</h4>
                <ul className="svc-section__bullets">
                  {bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </>
            )}

            {/* Secondary CTAs */}
            <div className="svc-section__more-actions">
              <a className="btn btn--outline" href={`/services/${id}`}>Learn more</a>
              <a className="btn btn--alt" href="/book-call">Book a call</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
