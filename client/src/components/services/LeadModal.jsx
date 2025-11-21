// client/src/components/services/LeadModal.jsx
import React, { useEffect, useRef, useState } from "react";
import "./LeadModal.css";
import api from "../../utils/api";

const LeadModal = ({ open = false, onClose = () => {}, initialIndustry = null }) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: initialIndustry?.title ?? "",
    budget: ""
  });
  const firstFieldRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  useEffect(() => {
    if (open) {
      setError("");
      setSuccessMsg("");
      setForm((f) => ({ ...f, role: initialIndustry?.title ?? f.role }));
      focusTimeoutRef.current = setTimeout(() => firstFieldRef.current?.focus(), 60);
    }
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
        focusTimeoutRef.current = null;
      }
    };
  }, [open, initialIndustry]);

  useEffect(() => {
    function handleEsc(e) { if (e.key === "Escape") onClose(); }
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (ev) => {
    ev.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!form.name || !form.email || !form.role) {
      setError("Please fill in name, email and role.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        company: form.company,
        role: form.role,
        budget: form.budget || null,
        source: "services-page"
      };
      await api.post("/leads", payload);
      setSuccessMsg("Thanks! We received your request — we’ll email a shortlist shortly.");
      setForm({ name: "", email: "", company: "", role: initialIndustry?.title ?? "", budget: "" });
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1100);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="vh-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <div className="vh-modal" role="document">
        <button className="vh-modal__close" aria-label="Close" onClick={onClose}>&times;</button>

        <h2 id="lead-modal-title" className="vh-modal__title">Request shortlist</h2>
        <p className="vh-modal__subtitle">Tell us a bit and we’ll send a curated shortlist to your inbox.</p>

        <form className="vh-modal__form" onSubmit={submit}>
          <label className="vh-field">
            <span className="vh-field__label">Your name</span>
            <input ref={firstFieldRef} name="name" value={form.name} onChange={onChange} placeholder="Asha Roy" />
          </label>

          <label className="vh-field">
            <span className="vh-field__label">Work email</span>
            <input name="email" value={form.email} onChange={onChange} placeholder="you@company.com" type="email" />
          </label>

          <label className="vh-field">
            <span className="vh-field__label">Company</span>
            <input name="company" value={form.company} onChange={onChange} placeholder="Acme Ltd." />
          </label>

          <label className="vh-field">
            <span className="vh-field__label">Role</span>
            <input name="role" value={form.role} onChange={onChange} placeholder="Senior Product Engineer" />
          </label>

          <label className="vh-field">
            <span className="vh-field__label">Budget (optional)</span>
            <input name="budget" value={form.budget} onChange={onChange} placeholder="₹ 60,000 - 1,20,000 / mo" />
          </label>

          {error && <div className="vh-modal__error" role="alert">{error}</div>}
          {successMsg && <div className="vh-modal__success" role="status">{successMsg}</div>}

          <div className="vh-modal__actions">
            <button type="button" className="btn btn--outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary" disabled={loading} style={{ minWidth: 160 }}>
              {loading ? "Sending..." : "Request shortlist"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
