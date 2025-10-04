// client/src/components/TalentSection.jsx
import React, { useState, useRef, useEffect } from "react";
import "./TalentSection.css";
import config from "../data/talentConfig";

const TalentSection = ({ brandColor = config.brandColor }) => {
  const categories = config.categories;
  const defaultKey =
    config.defaultCategory || (categories[0] && categories[0].key);
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 4);
  const activeIndex = visibleCategories.findIndex((c) => c.key === activeKey);
  const tabsRef = useRef(null);

  // Ensure active tab is within the visible set when toggling showAll
  useEffect(() => {
    if (!visibleCategories.find((c) => c.key === activeKey)) {
      if (visibleCategories[0]) setActiveKey(visibleCategories[0].key);
    }
  }, [showAll, categories]);

  // Keyboard navigation
  useEffect(() => {
    const node = tabsRef.current;
    if (!node) return;
    const handleKey = (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        const prev = (activeIndex - 1 + visibleCategories.length) % visibleCategories.length;
        setActiveKey(visibleCategories[prev].key);
      } else if (e.key === "ArrowRight") {
        const next = (activeIndex + 1) % visibleCategories.length;
        setActiveKey(visibleCategories[next].key);
      } else if (e.key === "Home") {
        setActiveKey(visibleCategories[0].key);
      } else if (e.key === "End") {
        setActiveKey(visibleCategories[visibleCategories.length - 1].key);
      }
    };
    node.addEventListener("keydown", handleKey);
    return () => node.removeEventListener("keydown", handleKey);
  }, [activeIndex, visibleCategories]);

  const active = categories.find((c) => c.key === activeKey) || categories[0];

  const prev = () => {
    const idx = (activeIndex - 1 + categories.length) % categories.length;
    setActiveKey(categories[idx].key);
  };
  const next = () => {
    const idx = (activeIndex + 1) % categories.length;
    setActiveKey(categories[idx].key);
  };

  return (
    <section className="vh-talent" aria-labelledby="vh-talent-heading">
      <div className="vh-talent__card">
        <h2 id="vh-talent-heading" className="vh-talent__heading">
          {config.heading}
        </h2>

        {/* Tabs */}
        <div className="vh-talent__tabs-row">
          <div
            className="vh-talent__tabs"
            role="tablist"
            aria-label="Talent categories"
            ref={tabsRef}
          >
            {visibleCategories.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={cat.key === activeKey}
                aria-controls={`vh-tabpanel-${cat.key}`}
                id={`vh-tab-${cat.key}`}
                tabIndex={cat.key === activeKey ? 0 : -1}
                className={`vh-talent__tab ${
                  cat.key === activeKey ? "active" : ""
                }`}
                onClick={() => setActiveKey(cat.key)}
                style={
                  cat.key === activeKey
                    ? { borderBottomColor: brandColor }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
            {!showAll && categories.length > 4 && (
              <button
                type="button"
                className="vh-talent__tab vh-talent__more"
                onClick={() => setShowAll(true)}
                aria-label="Show more categories"
              >
                + More
              </button>
            )}
          </div>

          {config.showArrows && (
            <div className="vh-talent__arrows" aria-hidden="false">
              <button
                className="vh-talent__arrow"
                aria-label="Previous category"
                onClick={prev}
              >
                ‹
              </button>
              <button
                className="vh-talent__arrow"
                aria-label="Next category"
                onClick={next}
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="vh-talent__content">
          {/* Left */}
          <div
            className="vh-talent__left"
            role="tabpanel"
            id={`vh-tabpanel-${active.key}`}
            aria-labelledby={`vh-tab-${active.key}`}
          >
            <p className="vh-talent__intro">{active.intro}</p>

            <h3 className="vh-talent__subhead">Roles we hire for</h3>
            <ul className="vh-talent__roles">
              {active.roles.map((r, i) => (
                <li key={i} className="vh-talent__role-item">
                  {r}
                </li>
              ))}
            </ul>

            {/* removed learn more link per request */}
          </div>

          {/* Right collage */}
          <div className="vh-talent__right" aria-hidden="true">
            <div className="vh-talent__collage">
              {/* Shapes */}
              <div
                className="vh-talent__shape vh-talent__shape--back"
                style={{ background: active.shapeColors?.[0] }}
              />
              <div
                className="vh-talent__shape vh-talent__shape--mid"
                style={{ background: active.shapeColors?.[1] }}
              />
              <div
                className="vh-talent__shape vh-talent__shape--front"
                style={{ background: active.shapeColors?.[2] }}
              />

              {/* Images */}
              <img
                className="vh-talent__img vh-talent__img--large"
                src={active.images?.[0] || "/images/placeholder-large.jpg"}
                alt=""
              />
              <img
                className="vh-talent__img vh-talent__img--small1"
                src={active.images?.[1] || "/images/placeholder-sm1.jpg"}
                alt=""
              />
              <img
                className="vh-talent__img vh-talent__img--small2"
                src={active.images?.[2] || "/images/placeholder-sm2.jpg"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentSection;
