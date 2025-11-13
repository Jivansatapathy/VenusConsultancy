// client/src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import "./Contact.css";
import API from "../utils/api";

const offices = [
  {
    title: "Toronto, Canada",
    flag: "https://flagcdn.com/w40/ca.png",
    addr: "205 – 1085 Bellamy Road North\nToronto, ON M1H 3C7",
    phone: ["647-722-0837"],
    email: "info@venushiring.ca",
  },
  {
    title: "Michigan, USA",
    flag: "https://flagcdn.com/w40/us.png",
    addr: "225 – 880 W Long Lake Road\nTroy, MI 48098",
    phone: ["248-275-1077", "718-715-0770"],
    email: "info@venushiring.com",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  // Ensure proper CSS loading when component mounts
  useEffect(() => {
    // Force a re-render to ensure CSS is properly applied
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Please enter a valid email.";
    if (!form.message.trim()) return "Please write a short message.";
    return null;
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setStatus(null);
    const err = validate();
    if (err) {
      setStatus({ type: "error", text: err });
      return;
    }

    setSubmitting(true);
    try {
      const response = await API.post('/contact/submit', form);
      const data = response.data;

      if (data.success) {
        setStatus({
          type: "success",
          text: data.message || "Thanks — we received your message. We will contact you soon.",
        });
        setForm({ name: "", phone: "", email: "", source: "", message: "" });
      } else {
        setStatus({
          type: "error",
          text: data.message || "Something went wrong — please try again later.",
        });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus({
        type: "error",
        text: "Something went wrong — please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* CONTACT CARD */}
      <section className="contact-card container">
        <div className="contact-inner">
          {/* Left column */}
          <aside className="contact-left" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact Us</h2>

            {/* Phone */}
            <div className="contact-block">
              <div className="icon-tile" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#e50914"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.61.54 2.39a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 6 6l1.68-1.01a2 2 0 0 1 2.11-.45c.78.24 1.58.42 2.39.54A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-meta">
                <div className="meta-label">Phone Number</div>
                <div className="meta-value">
                  <a href="tel:248-275-1077" style={{ color: 'inherit', textDecoration: 'none' }}>248-275-1077</a>
                </div>
                <div className="meta-value" style={{ marginTop: '0.5rem' }}>
                  <a href="tel:718-715-0770" style={{ color: 'inherit', textDecoration: 'none' }}>718-715-0770</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="contact-block">
              <div className="icon-tile" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#e50914"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <polyline points="3,7 12,13 21,7" />
                </svg>
              </div>
              <div className="contact-meta">
                <div className="meta-label">Email</div>
                <div className="meta-value">info@venushiring.com</div>
              </div>
            </div>

            

            <div className="follow-label">Follow Us</div>
            <div className="social-row" aria-label="Follow us on social media">
              <a className="social-icon" href="https://www.linkedin.com/company/the-venus-consultancy-ltd/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#e50914"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4V8h4v2a4 4 0 0 1 2-2z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a className="social-icon" href="https://www.facebook.com/venushiring" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#e50914"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a4 4 0 0 0-4 4v4H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a className="social-icon" href="https://www.instagram.com/venushiring?igsh=MTFyYTMycDlkcXh4NQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#e50914"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
            </div>
          </aside>

          {/* Right column: form */}
          <div className="contact-right" aria-labelledby="get-in-touch">
            <h2 id="get-in-touch">Get in Touch</h2>

            <form className="contact-form" onSubmit={submitContact} noValidate>
              <div className="form-row">
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <select name="source" value={form.source} onChange={handleChange}>
                  <option value="">How did you hear about us?</option>
                  <option value="google">Google</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Referral</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div className="form-row">
                <textarea
                  name="message"
                  placeholder="Leave us a Message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {status && (
                <div className={`form-status ${status.type === "error" ? "error" : "success"}`}>
                  {status.text}
                </div>
              )}

              <div className="form-actions">
                <button className="btn-submit" type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* OFFICES SECTION */}
      <section className="offices-section container">
        <h3 className="offices-title">Our Office Locations</h3>
        <p className="offices-sub">
          Combined with our role as trusted advisors for professionals translates into our core capability — Building careers. Building Organisations.
        </p>

        <div className="offices-grid">
          {offices.map((o) => (
            <article key={o.title} className="office-card" aria-labelledby={o.title}>
              <h4 className="office-title">
                <img 
                  src={o.flag} 
                  alt={`${o.title} flag`} 
                  className="office-flag"
                  style={{
                    width: '24px',
                    height: '18px',
                    marginRight: '8px',
                    borderRadius: '2px',
                    display: 'inline-block',
                    verticalAlign: 'middle'
                  }}
                />
                {o.title}
              </h4>
              <div className="office-addr">
                {o.addr.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>

              <hr className="office-sep" />

              <div className="office-contact">
                <div><strong>Contact</strong></div>
                {o.phone.map((ph, idx) => (
                  <div key={idx}>Ph: {ph}</div>
                ))}
                {o.email && (
                  <div>Email: <a href={`mailto:${o.email}`} style={{ color: 'inherit' }}>{o.email}</a></div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
