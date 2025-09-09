// client/src/pages/Services.jsx
import React from "react";
import HowWeHire from "../components/services/HowWeHire";
import IndustryGrid from "../components/services/IndustryGrid";
import "./Services.css";

const Services = () => {
  const processSteps = [
    {
      id: "discover",
      title: "Discover",
      desc: "Role scoping & requirement mapping",
      image: "/illustrations/serviceshero-1.png",
      imageAlt: "Discover step illustration"
    },
    {
      id: "sourcing",
      title: "Sourcing",
      desc: "Attract & shortlist talent",
      image: "/illustrations/serviceshero-1.png",
      imageAlt: "Sourcing step illustration"
    },
    {
      id: "interview",
      title: "Interview",
      desc: "Structured evaluation",
      image: "/illustrations/serviceshero-1.png",
      imageAlt: "Interview step illustration"
    },
    {
      id: "onboard",
      title: "Onboard",
      desc: "Smooth joining & follow-up",
      image: "/illustrations/serviceshero-1.png",
      imageAlt: "Onboard step illustration"
    },
  ];

  return (
    <main className="svc-page">
      <header className="svc-hero">
        <div className="svc-hero__inner">
          <small className="svc-hero__eyebrow">Services</small>

          <div className="svc-hero__content">
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

      <HowWeHire steps={processSteps} />

      {/* Who we Hire heading above industry grid */}
      <section id="services-list" className="svc-container">
        <div className="svc-heading">
          <h2 className="svc-section-title">Who we Hire</h2>
          <p className="svc-section-sub">
            Explore the industries and roles we specialize in hiring for.
          </p>
        </div>

        <IndustryGrid />
      </section>
    </main>
  );
};

export default Services;
