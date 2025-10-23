import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ServiceCategory.css";

const ServiceCategory = () => {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Service category data
  const serviceCategories = {
    "technology-software-development": {
      title: "Technology & Software Development",
      description: "Find top-tier technology professionals to drive your digital transformation and software development initiatives.",
      icon: "💻",
      color: "#007bff",
      jobs: [
        "Full Stack Developer",
        "Frontend Developer", 
        "Backend Developer",
        "Mobile App Developer",
        "DevOps Engineer",
        "Cloud Architect",
        "Data Engineer",
        "Machine Learning Engineer",
        "AI Specialist",
        "Cybersecurity Analyst",
        "IT Support Specialist",
        "System Administrator",
        "Network Engineer",
        "Database Administrator",
        "QA Engineer",
        "Test Automation Engineer",
        "Technical Writer",
        "Solution Architect",
        "Product Owner",
        "Scrum Master",
        "Agile Coach",
        "Technical Lead",
        "Engineering Manager",
        "CTO"
      ],
      benefits: [
        "Access to top 1% of tech talent",
        "Rapid deployment (2-4 weeks)",
        "95% retention rate",
        "24/7 technical support",
        "Scalable team solutions"
      ],
      stats: {
        candidates: "10,000+",
        companies: "500+",
        successRate: "95%",
        avgTime: "2-4 weeks"
      }
    },
    "healthcare-medical": {
      title: "Healthcare & Medical",
      description: "Connect with qualified healthcare professionals across all specialties to strengthen your medical team.",
      icon: "🏥",
      color: "#28a745",
      jobs: [
        "Physician",
        "Nurse Practitioner",
        "Registered Nurse",
        "Licensed Practical Nurse",
        "Medical Assistant",
        "Physician Assistant",
        "Pharmacist",
        "Pharmacy Technician",
        "Medical Technologist",
        "Radiology Technician",
        "Laboratory Technician",
        "Physical Therapist",
        "Occupational Therapist",
        "Speech Therapist",
        "Respiratory Therapist",
        "Medical Social Worker",
        "Healthcare Administrator",
        "Medical Billing Specialist",
        "Health Information Manager",
        "Clinical Research Coordinator",
        "Medical Device Specialist",
        "Healthcare IT Specialist",
        "Telemedicine Coordinator",
        "Patient Care Coordinator"
      ],
      benefits: [
        "Licensed and certified professionals",
        "Background verified candidates",
        "Compliance with healthcare regulations",
        "Specialized recruitment expertise",
        "Quick placement (1-3 weeks)"
      ],
      stats: {
        candidates: "5,000+",
        companies: "200+",
        successRate: "98%",
        avgTime: "1-3 weeks"
      }
    },
    "finance-banking": {
      title: "Finance & Banking",
      description: "Hire experienced finance and banking professionals to drive your financial strategy and operations.",
      icon: "💰",
      color: "#ffc107",
      jobs: [
        "Investment Banker",
        "Financial Analyst",
        "Portfolio Manager",
        "Risk Manager",
        "Credit Analyst",
        "Loan Officer",
        "Mortgage Specialist",
        "Insurance Agent",
        "Actuary",
        "Compliance Officer",
        "Anti-Money Laundering Specialist",
        "Treasury Analyst",
        "Corporate Finance Manager",
        "Mergers & Acquisitions Specialist",
        "Private Equity Associate",
        "Hedge Fund Manager",
        "Financial Planner",
        "Wealth Manager",
        "Tax Advisor",
        "Audit Manager",
        "Financial Controller",
        "Treasury Manager",
        "Capital Markets Specialist",
        "Fintech Specialist"
      ],
      benefits: [
        "CFA, CPA, and other certifications",
        "Regulatory compliance expertise",
        "Risk management specialists",
        "Financial modeling experts",
        "Fast-track hiring process"
      ],
      stats: {
        candidates: "3,000+",
        companies: "150+",
        successRate: "92%",
        avgTime: "2-3 weeks"
      }
    },
    "education-training": {
      title: "Education & Training",
      description: "Find qualified educators and training professionals to enhance your educational programs and corporate training initiatives.",
      icon: "🎓",
      color: "#17a2b8",
      jobs: [
        "Elementary Teacher",
        "High School Teacher",
        "College Professor",
        "Special Education Teacher",
        "Curriculum Developer",
        "Educational Technology Specialist",
        "School Administrator",
        "Principal",
        "Superintendent",
        "Guidance Counselor",
        "Librarian",
        "Training Manager",
        "Corporate Trainer",
        "Instructional Designer",
        "E-Learning Specialist",
        "Academic Advisor",
        "Student Affairs Coordinator",
        "Research Coordinator",
        "Grant Writer",
        "Education Consultant",
        "Tutoring Coordinator",
        "Adult Education Instructor",
        "Vocational Trainer",
        "Education Policy Analyst"
      ],
      benefits: [
        "Certified and licensed educators",
        "Curriculum development expertise",
        "Technology integration specialists",
        "Assessment and evaluation experts",
        "Flexible placement options"
      ],
      stats: {
        candidates: "4,000+",
        companies: "300+",
        successRate: "94%",
        avgTime: "2-4 weeks"
      }
    },
    "sales-business-development": {
      title: "Sales & Business Development",
      description: "Hire top-performing sales professionals and business development experts to drive your revenue growth.",
      icon: "📈",
      color: "#dc3545",
      jobs: [
        "Sales Representative",
        "Account Executive",
        "Sales Manager",
        "Regional Sales Director",
        "VP of Sales",
        "Business Development Manager",
        "Partnership Manager",
        "Channel Sales Manager",
        "Inside Sales Representative",
        "Outside Sales Representative",
        "Sales Engineer",
        "Customer Success Manager",
        "Account Manager",
        "Key Account Manager",
        "Sales Operations Manager",
        "Sales Analyst",
        "Lead Generation Specialist",
        "Sales Trainer",
        "Territory Manager",
        "Retail Sales Manager",
        "E-commerce Sales Manager",
        "International Sales Manager",
        "Sales Consultant",
        "Revenue Operations Manager"
      ],
      benefits: [
        "Proven track record verification",
        "Industry-specific expertise",
        "CRM and sales tool proficiency",
        "Performance-based hiring",
        "Quick ramp-up time"
      ],
      stats: {
        candidates: "6,000+",
        companies: "400+",
        successRate: "90%",
        avgTime: "1-2 weeks"
      }
    },
    "human-resources-talent": {
      title: "Human Resources & Talent",
      description: "Find experienced HR professionals and talent acquisition specialists to build and manage your workforce.",
      icon: "👥",
      color: "#6f42c1",
      jobs: [
        "HR Generalist",
        "HR Manager",
        "HR Director",
        "CHRO",
        "Recruiter",
        "Senior Recruiter",
        "Talent Acquisition Manager",
        "Head of Talent",
        "HR Business Partner",
        "Compensation Analyst",
        "Benefits Administrator",
        "Employee Relations Specialist",
        "Training & Development Manager",
        "Organizational Development Specialist",
        "HRIS Specialist",
        "Payroll Specialist",
        "HR Coordinator",
        "Talent Development Manager",
        "Diversity & Inclusion Manager",
        "HR Analytics Specialist",
        "Workplace Culture Manager",
        "Employee Engagement Specialist",
        "HR Consultant",
        "People Operations Manager"
      ],
      benefits: [
        "HR certification and expertise",
        "Employment law compliance",
        "Talent strategy development",
        "Culture and engagement focus",
        "Scalable HR solutions"
      ],
      stats: {
        candidates: "2,500+",
        companies: "250+",
        successRate: "96%",
        avgTime: "2-3 weeks"
      }
    },
    "marketing-communications": {
      title: "Marketing & Communications",
      description: "Hire creative marketing professionals and communication experts to elevate your brand and reach your audience.",
      icon: "📢",
      color: "#e83e8c",
      jobs: [
        "Marketing Manager",
        "Marketing Director",
        "CMO",
        "Digital Marketing Specialist",
        "Content Marketing Manager",
        "Social Media Manager",
        "SEO Specialist",
        "PPC Specialist",
        "Email Marketing Manager",
        "Brand Manager",
        "Product Marketing Manager",
        "Marketing Analyst",
        "Marketing Automation Specialist",
        "Growth Marketing Manager",
        "Performance Marketing Manager",
        "Public Relations Manager",
        "Communications Manager",
        "Content Creator",
        "Copywriter",
        "Graphic Designer",
        "Video Producer",
        "Marketing Operations Manager",
        "Campaign Manager",
        "Marketing Consultant"
      ],
      benefits: [
        "Creative portfolio review",
        "Campaign performance tracking",
        "Digital marketing expertise",
        "Brand strategy development",
        "ROI-focused hiring"
      ],
      stats: {
        candidates: "3,500+",
        companies: "350+",
        successRate: "93%",
        avgTime: "2-3 weeks"
      }
    }
  };

  const currentCategory = serviceCategories[categoryKey];

  if (!currentCategory) {
    return (
      <div className="service-category-not-found">
        <h1>Service Category Not Found</h1>
        <p>The requested service category could not be found.</p>
        <Link to="/services" className="btn btn-primary">Back to Services</Link>
      </div>
    );
  }

  const handleJobClick = (jobTitle) => {
    setSelectedJob(jobTitle);
    setShowApplyModal(true);
  };

  const ApplyModal = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!formData.name || !formData.email || !formData.company) {
        setMessage({ type: "error", text: "Name, email, and company are required" });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage({ type: "error", text: "Please enter a valid email address" });
        return;
      }

      setLoading(true);
      setMessage({ type: "", text: "" });

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setMessage({ type: "success", text: "Request submitted successfully! We'll contact you within 24 hours." });
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (err) {
        setMessage({ type: "error", text: "Network error. Please try again." });
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="service-category-modal-overlay" onClick={onClose}>
        <div className="service-category-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="service-category-modal-header">
            <h2>Hire {job}</h2>
            <button className="service-category-modal-close" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="service-category-apply-form">
            <div className="service-category-form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="service-category-form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="service-category-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="service-category-form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                placeholder="Enter your company name"
              />
            </div>

            <div className="service-category-form-group">
              <label>Additional Requirements</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about your specific requirements, timeline, and any other details..."
              />
            </div>

            {message.text && (
              <div className={`service-category-message ${message.type}`}>
                {message.text}
              </div>
            )}

            <div className="service-category-form-actions">
              <button type="button" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <main className="service-category-page">
      {/* Hero Section */}
      <section className="service-category-hero" style={{ backgroundColor: currentCategory.color }}>
        <div className="service-category-container">
          <div className="service-category-hero-content">
            <div className="service-category-hero-left">
              <div className="service-category-icon">{currentCategory.icon}</div>
              <h1 className="service-category-title">{currentCategory.title}</h1>
              <p className="service-category-description">{currentCategory.description}</p>
              <div className="service-category-stats">
                <div className="stat-item">
                  <span className="stat-number">{currentCategory.stats.candidates}</span>
                  <span className="stat-label">Available Candidates</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{currentCategory.stats.successRate}</span>
                  <span className="stat-label">Success Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{currentCategory.stats.avgTime}</span>
                  <span className="stat-label">Avg. Placement Time</span>
                </div>
              </div>
            </div>
            <div className="service-category-hero-right">
              <div className="service-category-benefits">
                <h3>Why Choose Our {currentCategory.title} Services?</h3>
                <ul>
                  {currentCategory.benefits.map((benefit, index) => (
                    <li key={index}>✓ {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Roles Section */}
      <section className="service-category-jobs">
        <div className="service-category-container">
          <div className="service-category-jobs-header">
            <h2>Available {currentCategory.title} Roles</h2>
            <p>Click on any role to start the hiring process</p>
          </div>
          
          <div className="service-category-jobs-grid">
            {currentCategory.jobs.map((job, index) => (
              <div 
                key={index} 
                className="service-category-job-card"
                role="button"
                tabIndex={0}
                onClick={() => handleJobClick(job)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleJobClick(job);
                  }
                }}
                aria-label={`Hire ${job}`}
              >
                <h3>{job}</h3>
                <p>Click to hire this role</p>
                <div className="job-card-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-category-cta">
        <div className="service-category-container">
          <div className="service-category-cta-content">
            <h2>Ready to Find Your Next {currentCategory.title} Professional?</h2>
            <p>Get started today and find the perfect candidate for your team.</p>
            <div className="service-category-cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => navigate('/services')}
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {showApplyModal && (
        <ApplyModal 
          job={selectedJob} 
          onClose={() => setShowApplyModal(false)} 
        />
      )}
    </main>
  );
};

export default ServiceCategory;
