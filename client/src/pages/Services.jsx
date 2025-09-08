// client/src/pages/Services.jsx
import React from "react";
import IndustryGrid from "../components/services/IndustryGrid";
import "./Services.css";

const Services = () => {
  return (
    <main className="svc-page">
      <header className="svc-hero">
        <div className="svc-hero__inner">
          {/* Eyebrow stays centered */}
          <small className="svc-hero__eyebrow">Services</small>

          {/* Two-column hero content */}
          <div className="svc-hero__content">
            {/* Left column: text + CTAs */}
            <div className="svc-hero__text">
              <h1 className="svc-hero__title">Our Services</h1>
              <p className="svc-hero__sub">
                Board advisory, executive search and talent programs —
                all available from a single partner.
              </p>

              <p className="svc-hero__lead">
                We partner with leadership teams to craft governance,
                hire leaders, and build talent programs that actually
                move the business forward.
              </p>

              <div className="svc-hero__ctas">
                <a className="btn btn--primary" href="/post-job">Post a Job</a>
                <a className="btn btn--alt" href="#services-list">Explore Services</a>
              </div>
            </div>

            {/* Right column: illustration (raw image, no card) */}
            <div className="svc-hero__image" aria-hidden="true">
              <img
                src="/illustrations/serviceshero-1.png"
                alt="Services illustration"
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      <section id="services-list" className="svc-container">
        <IndustryGrid />
      </section>
    </main>
  );
};

export default Services;
