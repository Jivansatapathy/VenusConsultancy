// client/src/components/services/ServiceSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./ServiceSection.css";

const MAX_EXPAND_HEIGHT = 900; // px cap
const EXTRA_BOTTOM = 32; // breathing room

const ServiceSection = ({ service, index, expanded: expandedProp, onToggle }) => {
  const {
    id = `service-${index}`,
    title,
    subtitle,
    description,
    bullets = [],
    roles = [],
    image,
    color = "#e50914"
  } = service;

  const controlled = typeof expandedProp === "boolean";
  const [localExpanded, setLocalExpanded] = useState(false);
  const expanded = controlled ? expandedProp : localExpanded;

  const contentRef = useRef(null);
  const moreContainerRef = useRef(null);
  const measureTimeoutRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const measure = () => {
    const el = contentRef.current;
    if (!el) return;
    // force layout
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;
    const scrollH = el.scrollHeight;
    setContentHeight(scrollH + EXTRA_BOTTOM);
  };

  const safeMeasure = () => {
    if (measureTimeoutRef.current) clearTimeout(measureTimeoutRef.current);
    measureTimeoutRef.current = setTimeout(() => {
      measure();
      measureTimeoutRef.current = null;
    }, 60);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const afterLayout = () => requestAnimationFrame(safeMeasure);

    const imgs = Array.from(el.querySelectorAll("img"));
    const onImgLoad = () => setTimeout(afterLayout, 40);
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", onImgLoad);
        img.addEventListener("error", onImgLoad);
      }
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(afterLayout).catch(afterLayout);
    } else {
      setTimeout(afterLayout, 120);
    }

    const mo = new MutationObserver(() => setTimeout(afterLayout, 40));
    mo.observe(el, { childList: true, subtree: true, attributes: true });

    window.addEventListener("resize", afterLayout);
    afterLayout();

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onImgLoad);
        img.removeEventListener("error", onImgLoad);
      });
      mo.disconnect();
      window.removeEventListener("resize", afterLayout);
      if (measureTimeoutRef.current) clearTimeout(measureTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef.current]);

  useEffect(() => {
    if (!expanded) return;
    const t = setTimeout(() => safeMeasure(), 70);
    return () => clearTimeout(t);
  }, [expanded]);

  const toggle = () => {
    const next = !expanded;
    if (typeof onToggle === "function") {
      onToggle(id, next);
    } else {
      setLocalExpanded(next);
    }
  };

  const badgeText = String(index + 1).padStart(2, "0");
  const computedHeight = contentHeight || 0;
  const cappedHeight = Math.min(computedHeight, MAX_EXPAND_HEIGHT);
  const isCapped = computedHeight > MAX_EXPAND_HEIGHT;

  return (
    <section
      id={id}
      className={`svc-section ${expanded ? "is-expanded" : ""}`}
      aria-labelledby={`svc-${id}-title`}
    >
      <div className="svc-section__inner">
        <div className="svc-section__row">
          <div className="svc-section__left">
            <div
              className="svc-section__badge"
              style={{ background: color }}
              aria-hidden="true"
            >
              {badgeText}
            </div>

            <div className="svc-section__image">
              <img
                src={image || "/illustrations/serviceshero-1.png"}
                alt={`${title} illustration`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="svc-section__right">
            {subtitle && <div className="svc-section__subtitle">{subtitle}</div>}
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

        <div
          id={`svc-${id}-more`}
          ref={moreContainerRef}
          className={`svc-section__more ${expanded ? "is-open" : ""}`}
          role="region"
          aria-hidden={!expanded}
          style={expanded ? { maxHeight: `${cappedHeight}px` } : { maxHeight: 0 }}
        >
          <div
            ref={contentRef}
            className="svc-section__more-inner"
            aria-hidden={!expanded}
            style={isCapped ? { maxHeight: `${MAX_EXPAND_HEIGHT}px` } : {}}
          >
            {roles && roles.length > 0 && (
              <>
                <h3 className="svc-section__more-title1">Roles We Hire For</h3>
                <div className="svc-section__roles" role="list">
                  {roles.map((r, idx) => (
                    <div key={r + idx} className="svc-role" role="listitem">
                      <div className="svc-role__avatar" aria-hidden="true" />
                      <div className="svc-role__label">{r}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {bullets && bullets.length > 0 && (
              <>
                <h3 className="svc-section__more-title1">What We Do</h3>
                <div className="svc-section__roles" role="list">
                  {bullets.map((b, i) => (
                    <div key={i} className="svc-role" role="listitem">
                      <div className="svc-role__avatar svc-role__avatar--small" aria-hidden="true" />
                      <div className="svc-role__label">{b}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="svc-section__more-actions1">
              <a className="btn btn--outline" href="/contact">Learn more</a>
              <a className="btn btn--alt" href="/contact">Book a call</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
