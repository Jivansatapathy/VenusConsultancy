// client/src/pages/BookCall.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./BookCall.css";

const BookCall = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "EST",
    message: "",
    callType: "consultation"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await API.post("/bookings", formData);
      
      if (response.status === 201) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          preferredDate: "",
          preferredTime: "",
          timezone: "EST",
          message: "",
          callType: "consultation"
        });
        
        // Redirect to contact page after 3 seconds
        setTimeout(() => {
          navigate("/contact");
        }, 3000);
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots (9 AM to 6 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: timeString, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="book-call-page">
      <div className="book-call-container">
        <div className="book-call-header">
          <h1>Book A Call</h1>
          <p>Schedule a consultation with our team to discuss your hiring needs</p>
        </div>

        <form className="book-call-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter your company name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="callType">Call Type *</label>
              <select
                id="callType"
                name="callType"
                value={formData.callType}
                onChange={handleInputChange}
                required
              >
                <option value="consultation">General Consultation</option>
                <option value="executive-search">Executive Search</option>
                <option value="leadership-hiring">Leadership Hiring</option>
                <option value="board-advisory">Board Advisory</option>
                <option value="talent-advisory">Talent Advisory</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="timezone">Timezone *</label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                required
              >
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Date *</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                min={today}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Time *</label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Additional Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              placeholder="Tell us more about your hiring needs or any specific questions you'd like to discuss..."
            />
          </div>

          {submitStatus === "success" && (
            <div className="success-message">
              <h3>Booking Request Submitted Successfully!</h3>
              <p>We'll contact you shortly to confirm your call time. Redirecting to contact page...</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="error-message">
              <h3>Submission Failed</h3>
              <p>There was an error submitting your booking request. Please try again or contact us directly.</p>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book My Call"}
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => navigate("/contact")}
            >
              Contact Us Instead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCall;
