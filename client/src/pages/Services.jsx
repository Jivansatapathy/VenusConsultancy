// client/src/pages/Services.jsx
import React from "react";
import "./Services.css";

const Services = () => {
  const services = [
    {
      title: "IT Recruitment",
      links: [
        "Developers (Web/Mobile/Full-stack)",
        "System Administrator",
        "DevOps / SRE",
        "Software Tester / QA",
        "UI/UX Designer",
        "Network Engineer",
        "Data Engineer / BI / Analyst",
        "Cloud Engineer",
        "Security / GRC",
        "IT Project Manager",
        "Business Analyst",
        "Product Manager",
      ],
    },
    {
      title: "E-commerce, Logistics & Supply Chain",
      links: [
        "Supply Chain",
        "Logistics",
        "Transportation",
        "Construction",
        "Procurement",
        "3PL",
        "Health & Safety",
        "Quality",
        "Production",
        "Distribution",
        "Trades",
        "Lean Six Sigma",
        "Warehousing",
        "Project Management",
        "Process Improvement",
        "Business & Strategic Planning",
        "Pharmaceuticals",
        "Consumer Packaged Goods",
        "Industrial",
        "Life Sciences",
      ],
    },
    {
      title: "Automotive & EV",
      links: [
        "Utilities Engineer",
        "System Engineer",
        "H&S & Sustainability Consultant",
        "Production Engineer",
        "HVAC Technician",
        "Power Engineer",
        "Battery Cell Manufacturing Engineer",
        "Electrical Engineer",
        "Battery Design Engineer",
      ],
    },
    {
      title: "Clinical Research",
      links: [
        "Sales",
        "Marketing",
        "Market Research",
        "Regulatory Affairs",
        "Supply Chain Management",
        "Clinical Trials Assistant",
        "Clinical Research",
        "Business Development",
        "Legal",
        "Chemical Engineering",
        "Laboratory Support",
        "Quality Control",
      ],
    },
    {
      title: "IT Outsourcing",
      links: [
        "Web Development",
        "Hosting",
        "Software & Application Development",
        "Website/Application Maintenance",
        "Technical Support",
        "Database Development & Management",
        "Telecommunications",
        "Infrastructure",
      ],
    },
    {
      title: "Technical Support & Customer Service",
      links: [
        "Live Chat Support",
        "Remote Desktop Support",
        "PC Networking",
        "Personal Tech Support Software",
        "Technical Specialist (IT)",
        "Customer Service — E-commerce",
        "Customer Service — Retail",
        "Customer Service — Banking",
      ],
    },
    {
      title: "Pharmaceutical & Life Science",
      links: [
        "Sales",
        "Marketing",
        "Market Research",
        "Regulatory Affairs",
        "Supply Chain Management",
        "Clinical Trials Assistant",
        "Clinical Research",
        "Business Development",
        "Legal",
        "Chemical Engineering",
        "Laboratory Support",
        "Quality Control",
        "Pharmacology",
      ],
    },
    {
      title: "C-suite Executive Search",
      links: [
        "Board Search",
        "Chief Executive Officer (CEO)",
        "Chief Financial Officer (CFO)",
        "Chief Operations Officer (COO)",
        "Chief Marketing Officer (CMO)",
        "Chief Revenue Officer (CRO)",
        "Chief Information Officer (CIO)",
        "Chief Technical Officer (CTO)",
        "Chief Human Resources Officer (CHRO)",
        "General Manager",
        "Country Manager",
      ],
    },
    {
      title: "AutoTech",
      links: [
        "Software Testing",
        "Embedded Software Developer",
        "Technical Project Manager",
        "Validation, Verification & Integration Testing",
        "Autonomous Vehicle System",
        "ADAS Engineers",
        "Mechanical Developers",
        "Software/Hardware Design",
        "Embedded Developers",
        "QA Engineers",
        "FuSa / Cybersecurity",
        "Infotainment Developers",
      ],
    },
    {
      title: "Manufacturing & Skilled Trade",
      links: [
        "Engineering",
        "Manufacturing",
        "Supply Chain",
        "Logistics",
        "Transportation",
        "Construction",
        "Procurement",
        "3PL",
        "Health & Safety",
        "Quality",
        "Production",
        "Distribution",
        "Trades",
        "Lean Six Sigma",
        "Warehousing",
        "Project Management",
        "Process Improvement",
        "Business & Strategic Planning",
        "Facilities Management",
        "Pharmaceuticals",
        "Consumer Packaged Goods",
        "Industrial",
        "Life Sciences",
      ],
    },
    {
      title: "Accounting & Back Office Outsourcing",
      links: [
        "CFO",
        "VP Finance",
        "Controller",
        "AP / AR Clerk",
        "Staff Accountant",
        "Intermediate Accountant",
        "Accounting Technician",
        "Sr. Accountant",
        "Sr. Accountant — Audit & Assurance",
        "Manager — Audit & Assurance",
        "Sr. Manager — Audit & Assurance",
        "Tax Technician",
        "Sr. Accountant — Tax",
        "Tax Specialist",
        "Manager — Tax",
        "Sr. Manager — Tax",
        "Valuations Specialist",
        "Manager — Valuations",
        "Sr. Manager — Valuations",
        "Manager — Professional Services",
        "Sr. Manager — Professional Services",
        "Tax Partner",
        "Audit Partner",
      ],
    },
    {
      title: "Aerospace",
      links: [
        "Control System Engineer",
        "Software Quality Engineer",
        "System Engineer",
        "Technical Project Manager",
        "Embedded Software Engineer",
        "Validation, Verification & Integration Engineer",
        "DO-178 Certification Experts",
      ],
    },
  ];

  const ServiceCard = ({ title, links }) => {
    const [expanded, setExpanded] = React.useState(false);
    const visible = expanded ? links : links.slice(0, 5);
    const hasMore = links.length > 5;
    return (
      <article className="svc-card">
        <div className="svc-card__icon" aria-hidden="true" />
        <h3 className="svc-card__title">{title}</h3>
        <ul className="svc-card__links">
          {visible.map((label) => (
            <li key={label}><a href="#">{label}</a></li>
          ))}
        </ul>
        {hasMore && (
          <button className="svc-card__toggle" type="button" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </article>
    );
  };
  return (
    <main className="services-page">
      <header className="svc-hero" role="banner">
        <div className="svc-container">
          <div className="svc-hero__grid" aria-label="Hero two column layout">
            <div className="svc-hero__left">
              <h1 className="svc-hero__title">Your partner in hiring the right talent for every role.</h1>
              <div className="svc-hero__ctas" role="group" aria-label="Primary actions">
                <a className="btn btn--primary" href="/contact">Contact Us</a>
                <a className="btn btn--outline1" href="#services">Browse on your own</a>
              </div>
            </div>

            <div className="svc-hero__right" aria-hidden="false">
              <div className="media-placeholder" role="img" aria-label="Media placeholder" />
            </div>
          </div>
        </div>
      </header>

      <div className="svc-divider" aria-hidden="true" />

      <section id="services" className="svc-services" aria-labelledby="svc-services-title">
        <div className="svc-container">
          <div className="svc-services__head">
            <h2 id="svc-services-title" className="svc-services__title">The perfect partner for your hiring needs</h2>
            <p className="svc-services__sub">Whatever your hiring challenge, explore our talent solutions to find the right professionals across 2,000+ specialized roles.</p>
          </div>

          <div className="svc-cards">
            {services.map((c) => (
              <ServiceCard key={c.title} title={c.title} links={c.links} />
            ))}
          </div>

          <div className="svc-services__footer">
            <a className="svc-browse-all" href="#">Browse All Services <span aria-hidden>→</span></a>
          </div>
        </div>


      {/* New Talent Discovery Section */}
      <section className="talent-discovery">
        {/* Red Banner Section */}
        <div className="talent-banner">
          <div className="svc-container">
            <div className="talent-banner__grid">
              <div className="talent-banner__left">
                <div className="project-brief image-placeholder" aria-label="Project Brief image placeholder">
                  <span className="image-placeholder__label">Project Brief Image</span>
                </div>
              </div>
              <div className="talent-banner__right">
                <h2 className="talent-banner__title">
                  Share your talent needs. Connect with qualified professionals within minutes.
                </h2>
                <p className="talent-banner__subtitle">
                  Tell us about your company and hiring goals to generate a custom Talent Brief in minutes.
                </p>
                <button className="talent-banner__cta">Find Talents</button>
              </div>
            </div>
          </div>
        </div>

        {/* Unified content: heading + image placeholders only */}
        <div className="talent-body">
          <div className="svc-container">
            <h2 className="talent-middle__title">
              Your one-stop-shop for better business decisions.
            </h2>
            <p className="talent-middle__subtitle">
              Tools for you, no matter where you are in your research process.
            </p>
            <div className="talent-image-grid">
              <div className="talent-image" aria-label="Search section image placeholder">
                <span className="image-placeholder__label">Image Placeholder</span>
              </div>
              <div className="talent-image" aria-label="Find section image placeholder">
                <span className="image-placeholder__label">Image Placeholder</span>
              </div>
              <div className="talent-image" aria-label="Decide section image placeholder">
                <span className="image-placeholder__label">Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>
              {/* Trusted-by / Testimonial Hero Section (placed right after talent body) */}
              <section className="trusted-hero" aria-labelledby="trusted-hero-title">
          <div className="svc-container">
            <div className="trusted-card">
              <header className="trusted-head">
                <h2 id="trusted-hero-title" className="trusted-title">Join leaders who choose Venus Hiring to power their hiring success.</h2>
                <p className="trusted-sub">Explore our talent marketplace and see why leaders trust us to hire the right people.</p>
              </header>

              <div className="trusted-logos" role="list" aria-label="Client logos">
                <div className="trusted-logo" aria-label="IBM logo placeholder">IBM</div>
                <div className="trusted-logo" aria-label="eBay logo placeholder">eBay</div>
                <div className="trusted-logo" aria-label="Delta logo placeholder">Delta</div>
                <div className="trusted-logo" aria-label="Mastercard logo placeholder">Mastercard</div>
                <div className="trusted-logo" aria-label="Comedy Central logo placeholder">Comedy Central</div>
                <div className="trusted-logo" aria-label="HelloFresh logo placeholder">HelloFresh</div>
              </div>

              <div className="trusted-divider" aria-hidden="true">
                <span className="trusted-quote">“</span>
              </div>

              <div className="trusted-testimonial">
                <p className="trusted-quote-text">Finding the right talent became effortless with Venus Hiring. It cut down our hiring time and optimized our resources.</p>
                <div className="trusted-meta">
                  <span className="meta-icon" aria-hidden="true" />
                  <span className="meta-text">Six Industries</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Testimonial Review Section */}
      <section className="testimonial-review" aria-labelledby="testimonial-review-title">
        <div className="testimonial-review__bg" />
        <div className="svc-container">
          <div className="testimonial-review__content">
            <div className="testimonial-review__cubes testimonial-review__cubes--top" aria-hidden="true">
              <div className="cube-placeholder" />
            </div>
            <div className="testimonial-review__cubes testimonial-review__cubes--bottom" aria-hidden="true">
              <div className="cube-placeholder" />
            </div>

            <div className="star-rating" aria-hidden="true" role="img" aria-label="5 star rating">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <h2 id="testimonial-review-title" className="testimonial-review__title">
              Share your success story and help companies hire with confidence.
            </h2>
            <p className="testimonial-review__text">
              Leave a review of the talent you've hired through Venus Hiring. Your feedback not only makes your voice heard but also helps other companies hire with confidence, saving them valuable time and resources.
            </p>
            <button className="testimonial-review__btn" type="button">Write a Review</button>
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="cta-section" aria-labelledby="cta-section-title">
        <div className="cta-section__bg" />
        <div className="svc-container">
          <div className="cta-section__content">
            <div className="cta-text">
              <p className="cta-kicker">Want to build a stronger team?</p>
              <h2 id="cta-section-title" className="cta-headline">
                Connect with your next talent on Venus
              </h2>
              <p className="cta-description">
                Get in front of thousands of companies actively hiring through the leading global talent marketplace.
              </p>
              <button className="cta-button" type="button">Create a Job Listing</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;
