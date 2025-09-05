import React from "react";
import "./AboutUs.css";
import { ArrowRight, Linkedin, Facebook, Instagram } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="about">
      <div className="about__container">
        {/* Left */}
        <div className="about__left">
          <h2 className="about__title">
            Building careers. Building
            <br /> organisations.
          </h2>

          <p className="about__subtitle">
            Venus Hiring is a recruitment and talent advisory firm helping
            startups, SMEs, and enterprises hire smarter. We connect high-impact
            talent to fast-growing teams across India and beyond.
          </p>

          <div className="about__ctaRow">
            <a href="/contact" className="about__cta">
              <span>Get In Touch</span>
              <span className="about__ctaIcon">
                <ArrowRight size={20} />
              </span>
            </a>

            <div className="about__socials">
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <Facebook size={22} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Right (media card) */}
        <div className="about__right">
          <div className="about__mediaWrap">
            {/* Option A: YouTube/video iframe */}
            {/* <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="About Venus Hiring"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}

            {/* Option B: Image placeholder */}
            <img
              src="/about-video-cover.jpg"
              alt="Team receiving award"
              className="about__img"
            />

            {/* simple dots (static) */}
            <div className="about__dots">
              <span className="active" />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
