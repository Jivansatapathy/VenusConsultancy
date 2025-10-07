import { useEffect, useState } from "react";
import API from "../utils/api";
import "./FindJobs.css";

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    location: "",
    department: "",
    tags: "",
    page: 1
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const { data } = await API.get(`/jobs?${params.toString()}`);
      setJobs(data.jobs || []);
      setPagination(data.pagination || {});
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="find-jobs-page">
      <div className="container">
        <header className="jobs-header">
          <h1>Find Your Next Opportunity</h1>
          <p>Discover exciting career opportunities that match your skills and interests</p>
        </header>

        <div className="jobs-content">
          <aside className="jobs-filters">
            <div className="filter-section">
              <h3>Search & Filters</h3>
              
              <div className="filter-group">
                <label>Search Jobs</label>
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Job Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="City, state..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Department</label>
                <input
                  type="text"
                  placeholder="Department..."
                  value={filters.department}
                  onChange={(e) => handleFilterChange("department", e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Tags</label>
                <input
                  type="text"
                  placeholder="Skills, technologies..."
                  value={filters.tags}
                  onChange={(e) => handleFilterChange("tags", e.target.value)}
                />
              </div>
            </div>
          </aside>

          <main className="jobs-results">
            {loading ? (
              <div className="loading">Loading jobs...</div>
            ) : (
              <>
                <div className="results-header">
                  <p>{pagination.totalJobs || 0} jobs found</p>
                </div>

                <div className="jobs-grid">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                {pagination.total > 1 && (
                  <Pagination
                    current={pagination.current}
                    total={pagination.total}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <>
      <div className="job-card">
        <div className="job-header">
          <h3>{job.title}</h3>
          <span className="job-type">{job.type}</span>
        </div>
        
        <div className="job-details">
          <p className="job-location">📍 {job.location}</p>
          <p className="job-department">🏢 {job.department}</p>
        </div>

        <div className="job-description">
          <p>{job.description}</p>
        </div>

        {job.tags && job.tags.length > 0 && (
          <div className="job-tags">
            {job.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <button 
          className="btn btn-primary apply-btn"
          onClick={() => setShowApplyModal(true)}
        >
          Apply Now
        </button>
      </div>

      {showApplyModal && (
        <ApplyModal 
          job={job} 
          onClose={() => setShowApplyModal(false)} 
        />
      )}
    </>
  );
};

const Pagination = ({ current, total, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button 
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          className={page === current ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button 
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
};

const ApplyModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverMessage: ""
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ type: "error", text: "Please upload a PDF, DOC, or DOCX file" });
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size must be less than 5MB" });
        return;
      }
      
      setResume(file);
      setMessage({ type: "success", text: "File selected successfully" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !resume) {
      setMessage({ type: "error", text: "Name, email, and resume are required" });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("jobId", job._id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("coverMessage", formData.coverMessage);
      formDataToSend.append("resume", resume);

      const { data } = await API.post(
        "/applications",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data && (data.ok || data._id || data.message)) {
        setMessage({ type: "success", text: "Application submitted successfully!" });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage({ type: "error", text: (data && (data.error || data.message)) || "Failed to submit application" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Apply for {job.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Cover Message (optional)</label>
            <textarea
              name="coverMessage"
              value={formData.coverMessage}
              onChange={handleInputChange}
              maxLength={1000}
              placeholder="Tell us why you're interested in this position..."
            />
            <small>{formData.coverMessage.length}/1000 characters</small>
          </div>

          <div className="form-group">
            <label>Resume *</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
            <small>PDF, DOC, or DOCX files only. Max 5MB.</small>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindJobs;
