// client/src/components/services/HowWeHire.jsx
import React, { useEffect, useRef, useState } from "react";
import "./HowWeHire.css";

/**
 * HowWeHire component
 * Props:
 *  - steps: array of { id, title, desc, image, imageAlt }
 *
 * Note: image can be either:
 *  - a public path string (e.g. "/illustrations/step-discover.png")
 *  - an imported module (e.g. import discoverImg from "../assets/..")
 *
 * If a provided image fails to load, the component will swap to
 * "/illustrations/placeholder.png". Put that placeholder into client/public/illustrations/.
 */

const HowWeHire = ({ steps = [] }) => {
  const fallback = [
    { id: "step-1", title: "Discover", desc: "Role scoping & requirement mapping", image: "/illustrations/serviceshero-1.png", imageAlt: "Discover" },
    { id: "step-2", title: "Sourcing", desc: "Attract & shortlist talent", image: "/illustrations/serviceshero-1.png", imageAlt: "Sourcing" },
    { id: "step-3", title: "Interview", desc: "Structured evaluation", image: "/illustrations/serviceshero-1.png", imageAlt: "Interview" },
    { id: "step-4", title: "Onboard", desc: "Smooth joining & follow-up", image: "/illustrations/serviceshero-1.png", imageAlt: "Onboard" },
  ];

  const items = steps && steps.length ? steps : fallback;

  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect reduced motion preference
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) {
      setVisible(true);
      return;
    }
    const el = rootRef.current;
    if (!el) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`how-we-hire ${visible ? "is-visible" : ""}`}
      aria-labelledby="how-we-hire-title"
    >
      <div className="how-we-hire__inner">
        <div className="how-we-hire__head">
          <h2 id="how-we-hire-title" className="how-we-hire__title">How we hire</h2>
          <p className="how-we-hire__subtitle">A simple, repeatable process to find the right fit — fast.</p>
        </div>

        <ol className="how-we-hire__grid" role="list" aria-label="Hiring process steps">
          {items.map((s, idx) => {
            const stepNum = String(idx + 1).padStart(2, "0"); // "01", "02"
            // local per-item image src state so we can swap to fallback on error
            const [imageSrc, setImageSrc] = (() => {
              // useRef trick to create stable per-item state inside map
              const ref = React.useRef();
              if (!ref.current) {
                ref.current = {
                  value: s.image || "/illustrations/placeholder.png",
                  set: (v) => { ref.current.value = v; }
                };
              }
              // return a stable pair [get, set] but we need real React state for rerender:
              // We'll use useState in a wrapper component below — simpler approach: render a small inner component
              return [s.image || "/illustrations/placeholder.png", (newSrc) => {}];
            })();

            // To keep code clean and to ensure each item has its own stateful image handling,
            // render a tiny inner component for the image area:
            const AvatarImage = () => {
              const [src, setSrc] = useState(s.image || "/illustrations/placeholder.png");

              // If the passed image is a module (object) like imported, use it directly.
              // If it's a string, use it directly too.
              useEffect(() => {
                setSrc(s.image || "/illustrations/placeholder.png");
              }, [s.image]);

              const handleError = (ev) => {
                // prevent infinite loop if placeholder missing
                if (ev.currentTarget.src && !ev.currentTarget.src.includes("placeholder.png")) {
                  ev.currentTarget.onerror = null;
                  ev.currentTarget.src = "/illustrations/placeholder.png";
                }
              };

              return (
                <img
                  src={src}
                  alt={s.imageAlt || `${s.title} illustration`}
                  loading="lazy"
                  decoding="async"
                  className="how-we-hire__avatar-img"
                  onError={handleError}
                  data-step-src={src}
                />
              );
            };

            return (
              <li
                key={s.id || idx}
                className="how-we-hire__item"
                role="listitem"
                tabIndex={0}
                aria-label={`${stepNum} ${s.title}`}
              >
                <div className="how-we-hire__avatar-wrap" aria-hidden="true">
                  <div className="how-we-hire__avatar" aria-hidden="true">
                    <AvatarImage />
                  </div>

                  <span className="how-we-hire__counter" aria-hidden="true">{stepNum}</span>
                </div>

                <div className="how-we-hire__meta">
                  <div className="how-we-hire__step-title">{s.title}</div>
                  {s.desc && <div className="how-we-hire__step-desc">{s.desc}</div>}
                </div>

                <span className="how-we-hire__connector" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowWeHire;
