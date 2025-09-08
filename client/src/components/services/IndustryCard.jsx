// client/src/components/services/IndustryCard.jsx
import React, { useState } from "react";
import "./IndustryCard.css";

/**
 * Props:
 *  - id, title, subtitle, description, bullets (array), extended (HTML string),
 *    images (array), illustration (string), color, metric, anchor, onRequestShortlist
 */
const IndustryCard = ({
  id,
  title,
  subtitle,
  description,
  bullets = [],
  extended = "",
  images = [],
  illustration,
  color = "#e50914",
  metric = {},
  anchor,
  onRequestShortlist = () => {}
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article id={anchor || id} className="svc-card" aria-labelledby={`svc-${id}-title`}>
      <div className="svc-card__body">
        <div className="svc-card__meta">
          <span className="svc-badge" style={{ borderColor: color }}>
            <small className="svc-badge__label">{metric?.label}</small>
            <strong className="svc-badge__value">{metric?.value}</strong>
          </span>
        </div>

        <h3 id={`svc-${id}-title`} className="svc-card__title">{title}</h3>
        {subtitle && <div className="svc-card__subtitle">{subtitle}</div>}
        <p className="svc-card__desc">{description}</p>

        {bullets && bullets.length > 0 && (
          <ul className="svc-card__bullets" aria-hidden={expanded ? "true" : "false"}>
            {bullets.map((b) => (
              <li key={b} className="svc-bullet">{b}</li>
            ))}
          </ul>
        )}

        <div className="svc-card__actions">
          <button
            className="btn btn--outline"
            onClick={() => setExpanded((s) => !s)}
            aria-expanded={expanded}
            aria-controls={`svc-expanded-${id}`}
            style={{ borderColor: color, color }}
          >
            {expanded ? "Show less" : "Know more"}
          </button>

          <button
            className="btn btn--primary"
            onClick={() => onRequestShortlist({ id, title })}
            style={{ backgroundColor: color, borderColor: color }}
          >
            Request shortlist
          </button>
        </div>

        <div
          id={`svc-expanded-${id}`}
          className={`svc-card__expanded ${expanded ? "open" : ""}`}
          aria-hidden={!expanded}
        >
          <div dangerouslySetInnerHTML={{ __html: extended }} />
        </div>
      </div>

      {/* decorative illustration */}
      {illustration && (
        <div className="svc-card__illus" aria-hidden="true">
          <img src={illustration} alt="" role="presentation" loading="lazy" className="svc-illus" width="420" height="240" />
        </div>
      )}

      {/* media images */}
      <div className="svc-card__media" aria-hidden="true">
        <div className="svc-media__row">
          <img src={images?.[0] || "https://via.placeholder.com/900x540?text=1"} alt={`${title} 1`} loading="lazy" width="900" height="540" />
          <img src={images?.[1] || "https://via.placeholder.com/700x440?text=2"} alt={`${title} 2`} loading="lazy" width="700" height="440" />
          <img src={images?.[2] || "https://via.placeholder.com/480x480?text=3"} alt={`${title} 3`} loading="lazy" width="480" height="480" />
        </div>
      </div>
    </article>
  );
};

export default IndustryCard;
