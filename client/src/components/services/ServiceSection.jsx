// client/src/components/services/ServiceSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./ServiceSection.css";

const MAX_EXPAND_HEIGHT = 800; // px cap
const EXTRA_BOTTOM = 32; // extra breathing space (px) added to measured scrollHeight

const ServiceSection = ({ service, index }) => {
  const { id, title, subtitle, description, bullets = [], roles = [], image, color = "#e50914" } = service;

  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);        // inner expanded content
  const moreContainerRef = useRef(null);  // the container that receives maxHeight
  const [contentHeight, setContentHeight] = useState(0);

  // Measure function with extra bottom padding and debug logging (keeps previous debugging behavior)
  const measure = () => {
    const el = contentRef.current;
    const moreEl = moreContainerRef.current;
    if (!el || !moreEl) return;

    // force layout then measure
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;

    const scrollH = el.scrollHeight;
    const clientH = el.clientHeight;
    const offsetH = el.offsetHeight;
    const computed = window.getComputedStyle(el);
    const paddingTop = parseFloat(computed.paddingTop || 0);
    const paddingBottom = parseFloat(computed.paddingBottom || 0);

    // Debug (optional) - comment out if noisy:
    // console.groupCollapsed(`Measure svc section ${id}`);
    // console.log("el.scrollHeight:", scrollH);
    // console.log("el.clientHeight:", clientH);
    // console.log("el.offsetHeight:", offsetH);
    // console.log("computed paddingTop/paddingBottom:", paddingTop, paddingBottom);
    // console.log("applied EXTRA_BOTTOM:", EXTRA_BOTTOM);
    // console.groupEnd();

    // Add extra bottom breathing room to measured height
    setContentHeight(scrollH + EXTRA_BOTTOM);
  };

  // Setup listeners to re-measure after images load, fonts ready, mutations, resize
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measureAfterLayout = () => {
      requestAnimationFrame(() => {
        measure();
      });
    };

    // Images inside content
    const imgs = Array.from(el.querySelectorAll("img"));
    const onImgLoad = () => {
      setTimeout(measureAfterLayout, 40);
    };
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", onImgLoad);
        img.addEventListener("error", onImgLoad);
      }
    });

    // Fonts ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAfterLayout).catch(() => measureAfterLayout());
    } else {
      setTimeout(measureAfterLayout, 120);
    }

    // Mutation observer
    const mo = new MutationObserver(() => setTimeout(measureAfterLayout, 40));
    mo.observe(el, { childList: true, subtree: true, attributes: true });

    // Resize listener
    window.addEventListener("resize", measureAfterLayout);

    // initial measure
    measureAfterLayout();

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onImgLoad);
        img.removeEventListener("error", onImgLoad);
      });
      mo.disconnect();
      window.removeEventListener("resize", measureAfterLayout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef.current]);

  // When expanded toggles, measure after paint
  useEffect(() => {
    if (!expanded) return;
    const idTimer = setTimeout(() => {
      measure();
    }, 60);
    return () => clearTimeout(idTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const toggle = () => setExpanded((s) => !s);
  const badgeText = String(index + 1).padStart(2, "0");

  // compute displayed max-height and whether we are capped
  const computedHeight = contentHeight || 0;
  const cappedHeight = Math.min(computedHeight, MAX_EXPAND_HEIGHT);
  const isCapped = computedHeight > MAX_EXPAND_HEIGHT;

  return (
    <section id={id} className="svc-section" aria-labelledby={`svc-${id}-title`}>
      <div className="svc-section__inner u-container">
        <div className="svc-section__row">
          <div className="svc-section__left">
            <div className="svc-section__badge" style={{ background: color }} aria-hidden="true">
              {badgeText}
            </div>

            <div className="svc-section__image">
              <img src={image || "/illustrations/serviceshero-1.png"} alt={`${title} illustration`} loading="lazy" decoding="async" />
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
          className="svc-section__more"
          role="region"
          aria-hidden={!expanded}
          style={
            expanded
              ? { maxHeight: `${cappedHeight}px`, overflowY: isCapped ? "auto" : "hidden" }
              : { maxHeight: 0 }
          }
        >
          <div ref={contentRef} className="svc-section__more-inner">
            {roles && roles.length > 0 && (
              <>
                <h3 className="svc-section__more-title1">Roles We Hire For</h3>
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

            {bullets && bullets.length > 0 && (
              <>
                <h3 className="svc-section__more-title1">What We Do</h3>
                <div className="svc-section__roles" role="list">
                  {bullets.map((b, i) => (
                    <div key={i} className="svc-role">
                      <div className="svc-role__avatar svc-role__avatar--small" aria-hidden="true" />
                      <div className="svc-role__label">{b}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="svc-section__more-actions1">
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
