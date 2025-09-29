// client/src/pages/AboutUs.jsx
import React from "react";
import "./AboutUs.css";
import CurvedLoop from "../components/CurvedLoop";
import ImageTrail from "../components/ImageTrail";
import ChromaGrid from "../components/ChromaGrid";

const AboutUs = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__bg" />
        <div className="about-hero__container">
          <h1 id="about-hero-title" className="about-hero__title">
            About Venus Hiring
          </h1>
          <p className="about-hero__sub">
            We connect ambitious teams with the right talent to build the future—faster and with confidence.
          </p>
          <div className="hero-image-trail">
            <ImageTrail
              items={[
                'https://picsum.photos/id/287/300/300',
                'https://picsum.photos/id/1001/300/300',
                'https://picsum.photos/id/1025/300/300',
                'https://picsum.photos/id/1026/300/300',
                'https://picsum.photos/id/1027/300/300',
                'https://picsum.photos/id/1028/300/300',
                'https://picsum.photos/id/1029/300/300',
                'https://picsum.photos/id/1030/300/300',
                'https://picsum.photos/id/1031/300/300',
                'https://picsum.photos/id/1032/300/300',
                'https://picsum.photos/id/1033/300/300',
                'https://picsum.photos/id/1034/300/300',
              ]}
              variant={1}
            />
          </div>
        </div>
      </section>

      {/* Stats + Buyers/Providers */}
      <section className="about-stats">
        <div className="about-stats__container">
          <div className="stats-row" role="group" aria-label="Key metrics">
            <div className="stat">
              <div className="stat__value">$2B+</div>
              <div className="stat__label">
                in global service
                <br />
                projects annually
              </div>
            </div>
            <div className="stat">
              <div className="stat__value">12M+</div>
              <div className="stat__label">
                active users
                <br />
                annually
              </div>
            </div>
            <div className="stat">
              <div className="stat__value">Every<br/>2 seconds</div>
              <div className="stat__label">
                buyers find a service provider
                <br />
                on Venus
              </div>
            </div>
          </div>

          <h2 className="about-stats__title">
            When you’re ready to execute,
            <br />
            you need firms that deliver.
          </h2>

          <div className="buyers-providers">
            <article className="bp-card bp-card--buyers">
              <div className="bp-card__content">
                <h3 className="bp-card__title">FOR BUYERS</h3>
                <p className="bp-card__text">
                  Solve your business challenge by searching our vetted database of 350,000+ service providers
                </p>
                <a href="#" className="bp-card__link">Start your search</a>
              </div>
              <img className="bp-card__graphic" src="/graphic1.png" alt="Buyer graphic" />
            </article>

            <article className="bp-card bp-card--providers">
              <img className="bp-card__graphic" src="/graphic2.png" alt="Provider graphic" />
              <div className="bp-card__content">
                <h3 className="bp-card__title">FOR PROVIDERS</h3>
                <p className="bp-card__text">
                  Get listed where buying decisions are made so you can capture the attention of in-market prospects
                </p>
                <a href="#" className="bp-card__link">Create a profile</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Team section: left = text + single bottom image, right = 5-image collage */}
      <section className="team-section" aria-labelledby="team-title">
        <div className="team-container">
          <div className="team-left">
            <div className="team-text">
              <h2 id="team-title" className="team-title">Our team</h2>
              <p className="team-desc">
                Meet the people who power our mission — a diverse, skilled group united by a
                commitment to deliver exceptional outcomes. Our strength comes from varied
                experience, collaborative culture, and a focus on growth and impact.
              </p>
              <a href="#" className="team-cta">Join our team</a>
            </div>

            <div className="team-left-bottom" aria-hidden="true">
              <div className="photo photo--lb" style={{ backgroundImage: "url('/team1.jpg')" }} role="img" aria-label="Team image placeholder" />
            </div>
          </div>

          <div className="team-right-collage" aria-hidden="true">
            <div className="collage-row">
              <div className="photo photo--r1" />
              <div className="photo photo--r2" />
            </div>
            <div className="collage-row">
              <div className="photo photo--r3" />
              <div className="photo photo--r4" />
            </div>
            <div className="collage-row">
              <div className="photo photo--r5" />
            </div>
          </div>
        </div>
      </section>

      {/* Curved Loop Text Section */}
      <section className="curved-text-section">
        <CurvedLoop 
          marqueeText="Hiring the best For the Best ✦ Connecting Talent with Opportunity. ✦ Shaping Careers, Building Futures. ✦"
          speed={2}
          curveAmount={300}
          direction="left"
          interactive={true}
          className="curved-text"
        />
      </section>

      {/* Leadership Team Section */}
      <section className="leadership-section" aria-labelledby="leadership-title">
        <div className="leadership-container">
          <div className="leadership-header">
            <h2 id="leadership-title" className="leadership-title">Leadership team</h2>
          </div>
          <div className="leadership-grid">
            <ChromaGrid 
              items={[
                {
                  image: "https://i.pravatar.cc/300?img=1",
                  title: "Amanda Baum",
                  subtitle: "SVP of Product",
                  borderColor: "#3B82F6",
                  gradient: "linear-gradient(145deg, #3B82F6, #000)",
                  url: "https://linkedin.com/in/amandabaum"
                },
                {
                  image: "https://i.pravatar.cc/300?img=2",
                  title: "Greg Carter",
                  subtitle: "VP of Marketing",
                  borderColor: "#10B981",
                  gradient: "linear-gradient(180deg, #10B981, #000)",
                  url: "https://linkedin.com/in/gregcarter"
                },
                {
                  image: "https://i.pravatar.cc/300?img=3",
                  title: "Tim Condon",
                  subtitle: "Chief Revenue Officer",
                  borderColor: "#F59E0B",
                  gradient: "linear-gradient(165deg, #F59E0B, #000)",
                  url: "https://linkedin.com/in/timcondon"
                },
                {
                  image: "https://i.pravatar.cc/300?img=4",
                  title: "Sergei Dubograev",
                  subtitle: "SVP of Development",
                  borderColor: "#EF4444",
                  gradient: "linear-gradient(195deg, #EF4444, #000)",
                  url: "https://linkedin.com/in/sergeidubograev"
                },
                {
                  image: "https://i.pravatar.cc/300?img=5",
                  title: "Faraz Hamedani",
                  subtitle: "VP of Strategic Finance",
                  borderColor: "#8B5CF6",
                  gradient: "linear-gradient(225deg, #8B5CF6, #000)",
                  url: "https://linkedin.com/in/farazhamedani"
                },
                {
                  image: "https://i.pravatar.cc/300?img=6",
                  title: "Eleonora Israele",
                  subtitle: "Chief of Staff",
                  borderColor: "#06B6D4",
                  gradient: "linear-gradient(135deg, #06B6D4, #000)",
                  url: "https://linkedin.com/in/eleonoraisraele"
                },
                {
                  image: "https://i.pravatar.cc/300?img=7",
                  title: "Brian Mate",
                  subtitle: "VP of Revenue",
                  borderColor: "#EC4899",
                  gradient: "linear-gradient(120deg, #EC4899, #000)",
                  url: "https://linkedin.com/in/brianmate"
                },
                {
                  image: "https://i.pravatar.cc/300?img=8",
                  title: "Stan Misiurev",
                  subtitle: "Head of Technology",
                  borderColor: "#84CC16",
                  gradient: "linear-gradient(150deg, #84CC16, #000)",
                  url: "https://linkedin.com/in/stanmisiurev"
                },
                {
                  image: "https://i.pravatar.cc/300?img=9",
                  title: "Angie Piparo",
                  subtitle: "Chief Operating Officer",
                  borderColor: "#F97316",
                  gradient: "linear-gradient(200deg, #F97316, #000)",
                  url: "https://linkedin.com/in/angiepiparo"
                },
                {
                  image: "https://i.pravatar.cc/300?img=10",
                  title: "Kimmie Restificar",
                  subtitle: "VP of Operations",
                  borderColor: "#6366F1",
                  gradient: "linear-gradient(175deg, #6366F1, #000)",
                  url: "https://linkedin.com/in/kimmierestificar"
                }
              ]}
              columns={5}
              rows={2}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section" aria-labelledby="testimonial-title">
        <div className="testimonial-container">
          <div className="testimonial-content">
            <div className="testimonial-image">
              <div className="image-placeholder">
                {/* Image placeholder - replace with actual image */}
              </div>
            </div>
            <div className="testimonial-text">
              <div className="quote-marks">"</div>
              <p className="testimonial-quote">
                We started Venus Hiring with a simple mission - to make the talent acquisition process more transparent and efficient. We've spent the last 10 years perfecting our technology to connect millions of businesses with the best fit talent to grow their business.
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <span className="author-name">Paresh Lheru</span>
                  <div className="linkedin-link">
                    <svg className="linkedin-icon" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </div>
                <span className="author-title">CEO, Founder & Chairman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutUs;


