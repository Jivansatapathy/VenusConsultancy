import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./IndustryPage.css";
import BlogSection from "../BlogSection";

/**
 * IndustryPage - Reusable template component for industry pages
 * @param {Object} data - Industry data from industryData.js
 */
export default function IndustryPage({ data }) {
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  if (!data) {
    return (
      <div className="industry-page-error">
        <h2>Industry page not found</h2>
        <p>The requested industry page could not be found.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const {
    hero,
    stats,
    benefits,
    jobs,
    cta,
    color = "#007bff",
  } = data;

  // Handle job click
  const handleJobClick = (jobTitle) => {
    setSelectedJob(jobTitle);
    setShowApplyModal(true);
  };

  // Handle CTA button click
  const handleButtonClick = (link, external) => {
    if (external) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      navigate(link);
    }
  };

  return (
    <div className="industry-page" style={{ "--primary-color": color }}>
      {/* Hero Section */}
      {hero && (
        <section
          className="industry-hero"
          style={{
            backgroundImage: hero.backgroundImage
              ? `url(${hero.backgroundImage})`
              : `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
          }}
        >
          <div className="industry-hero-overlay"></div>
          <div className="industry-container">
            <div className="industry-hero-content">
              <div className="industry-hero-left">
                {hero.subtitle && (
                  <p className="industry-banner">{hero.subtitle}</p>
                )}
                <h1 className="industry-title">{hero.title}</h1>
                {hero.description && (
                  <p className="industry-description">{hero.description}</p>
                )}
                {cta && cta.enabled && cta.primaryButton && (
                  <button
                    className="industry-hero-cta"
                    onClick={() =>
                      handleButtonClick(
                        cta.primaryButton.link,
                        cta.primaryButton.external
                      )
                    }
                  >
                    {cta.primaryButton.text} +
                  </button>
                )}
              </div>
              <div className="industry-hero-right">
                {hero.heroImage && (
                  <img
                    src={hero.heroImage}
                    alt={hero.title}
                    className="industry-hero-image"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {data.services && data.services.enabled && data.services.items && (
        <section className="industry-services">
          <div className="industry-container">
            <div className="industry-services-header">
              <div className="industry-services-header-left">
                {data.services.banner && (
                  <p className="industry-services-banner">{data.services.banner}</p>
                )}
                {data.services.title && (
                  <h2 className="industry-services-title">{data.services.title}</h2>
                )}
              </div>
              {data.services.viewAllButton && (
                <button
                  className="industry-services-view-all"
                  onClick={() =>
                    handleButtonClick(
                      data.services.viewAllButton.link,
                      data.services.viewAllButton.external
                    )
                  }
                >
                  {data.services.viewAllButton.text}
                </button>
              )}
            </div>
            <div className="industry-services-grid">
              {data.services.items.map((service, index) => (
                <div key={index} className="industry-service-card">
                  {service.image && (
                    <div className="industry-service-image-wrapper">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="industry-service-image"
                      />
                    </div>
                  )}
                  <h3 className="industry-service-card-title">{service.title}</h3>
                  {service.description && (
                    <p className="industry-service-card-description">{service.description}</p>
                  )}
                  {service.link && (
                    <a
                      href={service.link.url}
                      className="industry-service-link"
                      onClick={(e) => {
                        if (!service.link.external) {
                          e.preventDefault();
                          handleButtonClick(service.link.url, service.link.external);
                        }
                      }}
                    >
                      {service.link.text} +
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What You Need Section */}
      {data.whatYouNeed && data.whatYouNeed.enabled && (
        <section className="industry-what-you-need">
          <div className="industry-container">
            <div className="industry-what-you-need-content">
              <div className="industry-what-you-need-left">
                {data.whatYouNeed.banner && (
                  <p className="industry-what-you-need-banner">{data.whatYouNeed.banner}</p>
                )}
                {data.whatYouNeed.title && (
                  <h2 className="industry-what-you-need-title">{data.whatYouNeed.title}</h2>
                )}
                {data.whatYouNeed.description && (
                  <p className="industry-what-you-need-description">{data.whatYouNeed.description}</p>
                )}
                {data.whatYouNeed.services && data.whatYouNeed.services.length > 0 && (
                  <div className="industry-what-you-need-services">
                    {data.whatYouNeed.services.map((service, index) => (
                      <div key={index} className="industry-what-you-need-service-item">
                        <span className="industry-what-you-need-checkmark">✓</span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                )}
                {data.whatYouNeed.button && (
                  <button
                    className="industry-what-you-need-button"
                    onClick={() =>
                      handleButtonClick(
                        data.whatYouNeed.button.link,
                        data.whatYouNeed.button.external
                      )
                    }
                  >
                    {data.whatYouNeed.button.text} +
                  </button>
                )}
              </div>
              <div className="industry-what-you-need-right">
                {data.whatYouNeed.image && (
                  <img
                    src={data.whatYouNeed.image}
                    alt={data.whatYouNeed.title || "What You Need"}
                    className="industry-what-you-need-image"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why We Should Be Your Partner Section */}
      {data.whyPartner && data.whyPartner.enabled && (
        <section className="industry-why-partner">
          <div className="industry-container">
            <div className="industry-why-partner-content">
              <div className="industry-why-partner-left">
                {data.whyPartner.image && (
                  <img
                    src={data.whyPartner.image}
                    alt={data.whyPartner.title || "Why Partner With Us"}
                    className="industry-why-partner-image"
                  />
                )}
              </div>
              <div className="industry-why-partner-right">
                {data.whyPartner.banner && (
                  <p className="industry-why-partner-banner">{data.whyPartner.banner}</p>
                )}
                {data.whyPartner.title && (
                  <h2 className="industry-why-partner-title">{data.whyPartner.title}</h2>
                )}
                {data.whyPartner.description && (
                  <p className="industry-why-partner-description">{data.whyPartner.description}</p>
                )}
                {data.whyPartner.points && data.whyPartner.points.length > 0 && (
                  <div className="industry-why-partner-points">
                    {data.whyPartner.points.map((point, index) => (
                      <div key={index} className="industry-why-partner-point-item">
                        <span className="industry-why-partner-checkmark">✓</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
                {data.whyPartner.button && (
                  <button
                    className="industry-why-partner-button"
                    onClick={() =>
                      handleButtonClick(
                        data.whyPartner.button.link,
                        data.whyPartner.button.external
                      )
                    }
                  >
                    {data.whyPartner.button.text} +
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Formula Section */}
      {data.formula && data.formula.enabled && (
        <section className="industry-formula">
          <div className="industry-formula-container">
            {/* Section with 70% BG Image and 30% White */}
            <div
              className="industry-formula-content"
              style={{
                backgroundImage: data.formula.backgroundImage
                  ? `url(${data.formula.backgroundImage})`
                  : "none",
              }}
            >
              {/* Top Content - Center Aligned */}
              <div className="industry-formula-top-content">
                {data.formula.title && (
                  <h2 className="industry-formula-title">
                    {data.formula.title.prefix}{" "}
                    <span className="industry-formula-title-highlight">
                      {data.formula.title.highlight}
                    </span>
                  </h2>
                )}
                {data.formula.stats && data.formula.stats.length > 0 && (
                  <div className="industry-formula-stats">
                    {data.formula.stats.map((stat, index) => (
                      <div key={index} className="industry-formula-stat-item">
                        <div className="industry-formula-stat-number">{stat.number}</div>
                        <div className="industry-formula-stat-label">{stat.label}</div>
                        {index < data.formula.stats.length - 1 && (
                          <div className="industry-formula-stat-divider"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Bottom Image - Center Aligned */}
              <div className="industry-formula-bottom-content">
                {data.formula.image && (
                  <img
                    src={data.formula.image}
                    alt={data.formula.imageAlt || "Formula"}
                    className="industry-formula-image"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Roles We Hire For Section */}
      {data.rolesWeHire && data.rolesWeHire.enabled && (
        <section className="industry-roles-we-hire">
          <div className="industry-container">
            <div className="industry-roles-header">
              {data.rolesWeHire.subtitle && (
                <p className="industry-roles-subtitle">{data.rolesWeHire.subtitle}</p>
              )}
              {data.rolesWeHire.title && (
                <h2 className="industry-roles-title">{data.rolesWeHire.title}</h2>
              )}
              {data.rolesWeHire.description && (
                <p className="industry-roles-description">{data.rolesWeHire.description}</p>
              )}
            </div>
            {data.rolesWeHire.items && data.rolesWeHire.items.length > 0 && (
              <div className="industry-roles-grid">
                {data.rolesWeHire.items.map((role, index) => (
                  <div key={index} className="industry-role-card">
                    {role.iconImage && (
                      <div className="industry-role-icon">
                        <img
                          src={role.iconImage}
                          alt={role.title}
                          className="industry-role-icon-image"
                        />
                      </div>
                    )}
                    {role.icon && !role.iconImage && (
                      <div className="industry-role-icon">
                        <span className="industry-role-icon-emoji">{role.icon}</span>
                      </div>
                    )}
                    <h3 className="industry-role-card-title">{role.title}</h3>
                    {role.description && (
                      <p className="industry-role-card-description">{role.description}</p>
                    )}
                    {role.link && (
                      <a
                        href={role.link.url}
                        className="industry-role-link"
                        onClick={(e) => {
                          if (!role.link.external) {
                            e.preventDefault();
                            handleButtonClick(role.link.url, role.link.external);
                          }
                        }}
                      >
                        {role.link.text} +
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faq && data.faq.enabled && data.faq.items && (
        <section className="industry-faq">
          <div className="industry-container">
            <div className="industry-faq-content">
              <div className="industry-faq-left">
                {data.faq.title && (
                  <h2 className="industry-faq-title">
                    {data.faq.title.prefix}{" "}
                    <span className="industry-faq-title-highlight">
                      {data.faq.title.highlight}
                    </span>
                  </h2>
                )}
                <div className="industry-faq-list">
                  {data.faq.items.map((faqItem, index) => (
                    <div
                      key={index}
                      className={`industry-faq-item ${
                        openFaqIndex === index ? "industry-faq-item--open" : ""
                      }`}
                    >
                      <button
                        className="industry-faq-question"
                        onClick={() =>
                          setOpenFaqIndex(openFaqIndex === index ? null : index)
                        }
                        aria-expanded={openFaqIndex === index}
                      >
                        <span className="industry-faq-question-text">
                          {faqItem.question}
                        </span>
                      </button>
                      <div
                        className={`industry-faq-answer ${
                          openFaqIndex === index ? "industry-faq-answer--open" : ""
                        }`}
                      >
                        <p className="industry-faq-answer-text">{faqItem.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="industry-faq-right">
                {data.faq.image && (
                  <img
                    src={data.faq.image}
                    alt="FAQ Illustration"
                    className="industry-faq-image"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {data.blogs && data.blogs.enabled && (
        <section className="industry-blogs">
          <div className="industry-container">
            <BlogSection />
          </div>
        </section>
      )}

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="industry-modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="industry-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="industry-modal-close"
              onClick={() => setShowApplyModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2>Apply for {selectedJob}</h2>
            <p>We'll help you find the perfect candidate for this role.</p>
            <div className="industry-modal-buttons">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowApplyModal(false);
                  navigate("/contact", { state: { jobRole: selectedJob } });
                }}
              >
                Contact Us
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowApplyModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

