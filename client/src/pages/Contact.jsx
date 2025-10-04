// client/src/pages/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

const offices = [
  {
    title: "Toronto, Canada",
    addr: "205 - 1085 Bellamy Road North, Toronto, ON",
    phone: ["647-722-0837"],
  },
  {
    title: "Michigan, USA",
    addr: "880 W Long Lake Rd Ste 225 | Troy, MI 48098",
    phone: ["248-275-1077", "718-715-0770"],
  },
  {
    title: "India",
    addr: "Mumbai, Surat, Chennai, Hyderabad",
    phone: ["+91-261-2601177", "+91-261-391177"],
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!/^\+?[0-9\s-]{7,20}$/.test(form.phone.trim()))
      return "Please enter a valid phone number.";
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
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

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
                <div className="meta-value">+647-722-0837</div>
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

            {/* Address */}
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
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-meta">
                <div className="meta-label">Corporate Office</div>
                <div className="meta-value">
                  205 - 1085 Bellamy Road North, Toronto, ON
                </div>
              </div>
            </div>

            <hr className="contact-sep" />

            <div className="follow-label">Follow Us</div>
            <div className="social-row" aria-label="Follow us on social media">
              <a className="social-icon" href="#" aria-label="LinkedIn">
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
              <a className="social-icon" href="#" aria-label="Facebook">
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
              <a className="social-icon" href="#" aria-label="Instagram">
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
                  name="phone"
                  placeholder="PhoneNo."
                  value={form.phone}
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
        <h3 className="offices-title">Our offices</h3>
        <p className="offices-sub">
          Combined with our role as trusted advisors for professionals translates into our core capability — Building careers. Building Organisations.
        </p>

        <div className="offices-grid">
          {offices.map((o) => (
            <article key={o.title} className="office-card" aria-labelledby={o.title}>
              <div className="office-icon" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21h18" />
                  <path d="M7 21V9h10v12" />
                  <path d="M7 9h10" />
                  <path d="M12 3v6" />
                </svg>
              </div>

              <h4 className="office-title">{o.title}</h4>
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
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
