import React, { useEffect, useRef, useState } from "react";
import "./JourneyStats.css";
import { Users, Briefcase, Award, MapPin } from "lucide-react";
import { STATS } from "../data/statsConfig";

/**
 * JourneyStats
 * - uses IntersectionObserver to run animations when section comes into view
 * - counts up numbers with an ease-out animation
 */
export default function JourneyStats() {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  // IntersectionObserver to set in-view once
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.28 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Eased count-up animation when inView becomes true
  useEffect(() => {
    if (!inView) return;

    const duration = 1400; // ms
    const startTime = performance.now();
    const from = STATS.map(() => 0);
    const to = STATS.map((s) => s.value);

    // easeOutCubic
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    let rafId;
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      const next = to.map((target, i) =>
        Math.round(from[i] + (target - from[i]) * eased)
      );
      setCounts(next);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  // helper to render icon (optional) — icons from lucide-react
  const getIcon = (iconKey) => {
    switch (iconKey) {
      case "users":
        return <Users size={28} aria-hidden="true" />;
      case "briefcase":
        return <Briefcase size={28} aria-hidden="true" />;
      case "award":
        return <Award size={28} aria-hidden="true" />;
      case "map":
        return <MapPin size={28} aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <section className="journey-band" ref={rootRef} aria-labelledby="journey-title">
      <div className="journey container">
        <header className="journey__head">
          <h2 id="journey-title">An integral part of global hiring journeys</h2>
          <p className="journey__lead">
            Trusted advisors to multinationals, leading businesses and leadership professionals worldwide.
          </p>
        </header>

        <div className={`journey__grid ${inView ? "is-visible" : ""}`} role="list" aria-live="polite">
          {STATS.map((stat, i) => (
            <div
              key={stat.key}
              className="journey__item"
              style={{ ["--i"]: i }}
              role="listitem"
              tabIndex={0}
              aria-label={`${stat.value}${stat.suffix || ""} - ${stat.label}`}
              title={stat.tooltip || ""} /* tooltip on hover */
            >
              <div className="journey__circle" aria-hidden="true">
                {stat.icon && <div className="journey__icon">{getIcon(stat.icon)}</div>}
                <div className="journey__num" aria-hidden="true">
                  {counts[i]}
                  <span className="journey__suffix">{stat.suffix}</span>
                </div>
              </div>

              <div className="journey__label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
