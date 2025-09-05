// client/src/components/WhyStats.jsx
import React, { useEffect, useRef } from "react";
import "./WhyStats.css";
import whyStats from "../data/whyStatsConfig";

/**
 * Simple count-up that supports numbers with commas and trailing plus/percent.
 * Respects prefers-reduced-motion.
 */
function parseValue(str) {
  // returns numeric part and suffix (like + or %)
  const m = String(str).match(/^([\d,\.]+)(.*)$/);
  if (!m) return { num: 0, suffix: "" };
  const num = Number(m[1].replace(/,/g, ""));
  return { num: isNaN(num) ? 0 : num, suffix: (m[2] || "").trim() };
}

function formatWithCommas(n) {
  return n.toLocaleString();
}

const animateCount = (el, targetStr) => {
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { num: targetNum, suffix } = parseValue(targetStr);

  if (prefersReduced || targetNum === 0) {
    el.textContent = targetStr;
    return;
  }

  const duration = 1200; // ms
  const start = performance.now();
  const startVal = 0;

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (targetNum - startVal) * ease);
    el.textContent = formatWithCommas(current) + (suffix ? suffix : "");
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // final set (ensure exact)
      el.textContent = targetStr;
    }
  };

  requestAnimationFrame(step);
};

const useOnScreenAndAnimate = (targetRef, selector) => {
  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    // Use IntersectionObserver to animate when visible
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = node.querySelectorAll(selector);
            els.forEach((el) => {
              const target = el.getAttribute("data-target");
              animateCount(el, target);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(node);

    return () => obs.disconnect();
  }, [targetRef, selector]);
};

const WhyStats = () => {
  const rootRef = useRef(null);
  useOnScreenAndAnimate(rootRef, ".vh-why__stat-value");

  return (
    <section className="vh-why u-container" aria-labelledby="why-heading" ref={rootRef}>
      <div className="vh-why__inner">
        <div className="vh-why__left">
          <h2 id="why-heading" className="vh-why__heading">{whyStats.heading}</h2>
          <div className="vh-why__left-value" aria-hidden="false">
            <span
              className="vh-why__stat-value"
              data-target={whyStats.left.value}
              role="text"
              aria-label={`${whyStats.left.value} — ${whyStats.left.caption}`}
            >
              {whyStats.left.value}
            </span>
            <div className="vh-why__left-caption">{whyStats.left.caption}</div>
          </div>
        </div>

        <div className="vh-why__right" aria-hidden="false">
          {whyStats.right.map((s, i) => (
            <div className="vh-why__right-item" key={i}>
              <div className="vh-why__right-value-wrap">
                <span
                  className="vh-why__stat-value"
                  data-target={s.value}
                  role="text"
                  aria-label={`${s.value} — ${s.caption}`}
                >
                  {s.value}
                </span>
              </div>
              <div className="vh-why__right-caption">{s.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStats;
