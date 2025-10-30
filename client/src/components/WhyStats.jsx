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
      <div className="vh-why__inner" style={{ gridTemplateColumns: '1fr' }}>
        <div className="vh-why__left">
          <h2 id="why-heading" className="vh-why__heading">Why Choose Us?</h2>
        </div>

        <div className="vh-why__right" aria-hidden="false">
          {[{
            title: 'Beyond Algorithm',
            lines: [
              'Each candidate and employer is evaluated by Venus Consultancy through a human-based process, not solely relying on algorithms.',
              'We use a mathematical calculation to match employer needs to personality and skills.',
              'Our goal is to find the right candidate using skills that a robot cannot offer.'
            ]
          }, {
            title: 'Diversity Supplier',
            lines: [
              'We offer recruitment services in IT, Engineering, Scientific, Skilled Trade, Light Industrial, Office & Clerical, Outsource, Onsite, Recruitment Process Outsourcing, and Technical Support Outsourcing.',
              'We also provide Executive & Board Recruitment services.'
            ]
          }, {
            title: 'Social & Integrity Skills',
            lines: [
              'We take responsibility for hiring candidates with strong social and integrity skills.',
              'These skills are essential in the workplace.',
              'We ensure candidates are well-prepared for interviews and job roles.'
            ]
          }, {
            title: 'Immigrant Pool',
            lines: [
              'We support and welcome immigrants to Canada and America.',
              'We assist in providing job opportunities across the globe.',
              'We offer staffing solutions for employers.'
            ]
          }].map((item, idx) => (
            <div className="vh-why__right-item" key={item.title}>
              <div className="vh-why__right-value-wrap">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
                  alt="icon static"
                  className="vh-why__icon vh-why__icon--static"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={idx === 1 ? "/iconanimated/union.gif" : "/iconanimated/algorithm.gif"}
                  alt="icon animated"
                  className="vh-why__icon vh-why__icon--gif"
                  loading="lazy"
                  decoding="async"
                />
                <span className="vh-why__stat-value" role="text" aria-label={item.title}>
                  {item.title}
                </span>
              </div>
              <div className="vh-why__right-caption">
                <ul className="vh-why__bullets">
                  {item.lines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStats;
