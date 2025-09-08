// IndustryCard.jsx (place in client/src/components/services/IndustryCard.jsx)
// NOTE: ensure IndustryGrid imports this component from "./IndustryCard"

import React, { useState, useRef, useEffect } from "react";
import "./IndustryCard.css";

/**
 * Props:
 *  - id, title, description, bullets (array), roles (array of {label, img?}), images (array), color (accent)
 *
 * This component displays:
 *  - left image with a numbered badge
 *  - right content with title/desc and Know more button
 *  - an expandable second section that shows roles & extra bullets,
 *    toggled by Know more / Show less button.
 */
const IndustryCard = ({
  id,
  title,
  description,
  bullets = [],
  roles = [], // optionally an array of strings or objects {label, img}
  images = [],
  color = "#e50914",
  metric = {}
}) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  // for smooth max-height animation, compute content height when expanded
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    if (!contentRef.current) return;
    // read content height
    setContentHeight(contentRef.current.scrollHeight);
  }, [expanded]);

  const toggle = () => setExpanded((s) => !s);

  return (
    <article className="svc-card" aria-labelledby={`svc-card-${id}-title`}>
      <div className="svc-card__top">
        <div className="svc-card__media">
          {/* numbered badge */}
          <div className="svc-card__badge" style={{ backgroundColor: color }}>
            <span className="svc-card__badge-num">{/* you can derive number from id or pass index as prop */}01</span>
          </div>

          {/* main image */}
          <div className="svc-card__imgwrap">
            <img
              src={images?.[0] || "/illustrations/serviceshero-1.png"}
              alt={`${title} illustration`}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="svc-card__content">
          <div className="svc-card__meta">
            {metric?.label && (
              <span className="svc-badge" style={{ borderColor: color }}>
                <small>{metric.label}</small>
                <strong>{metric.value}</strong>
              </span>
            )}
          </div>

          <h3 id={`svc-card-${id}-title`} className="svc-card__title">{title}</h3>

          <p className="svc-card__desc">{description}</p>

          <div className="svc-card__actions">
            <button
              className="btn btn--primary"
              aria-expanded={expanded}
              aria-controls={`svc-card-${id}-more`}
              onClick={toggle}
            >
              {expanded ? "Show less" : "Know More"}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable section */}
      <div
        id={`svc-card-${id}-more`}
        className="svc-card__more"
        role="region"
        aria-hidden={!expanded}
        style={
          expanded
            ? { maxHeight: `${contentHeight}px` }
            : { maxHeight: 0 }
        }
      >
        <div ref={contentRef} className="svc-card__more-inner">
          {/* Roles grid (circular icons + label) */}
          {roles && roles.length > 0 && (
            <>
              <h4 className="svc-card__more-title">Roles We Hire For</h4>
              <div className="svc-roles-grid" role="list">
                {roles.map((r, idx) => {
                  // role can be string or object { label, img }
                  const label = typeof r === "string" ? r : r.label;
                  const img = typeof r === "string" ? null : r.img;
                  return (
                    <div key={label + idx} className="svc-role" role="listitem">
                      <div className="svc-role__img">
                        {img ? <img src={img} alt={label} loading="lazy" /> : <div className="svc-role__placeholder" />}
                      </div>
                      <div className="svc-role__label">{label}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* bullets / highlights */}
          {bullets && bullets.length > 0 && (
            <>
              <h4 className="svc-card__more-title">What we do</h4>
              <ul className="svc-card__bullets">
                {bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </>
          )}

          {/* Secondary CTA row inside expanded */}
          <div className="svc-card__more-actions">
            <a className="btn btn--outline" href={`/services/${id}`}>Learn more</a>
            <a className="btn btn--alt" href="/book-call">Book a call</a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default IndustryCard;
