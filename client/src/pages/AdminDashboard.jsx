import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editingRecruiter, setEditingRecruiter] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "jobs") {
        const { data } = await API.get("/jobs/admin/all");
        setJobs(data);
      } else if (activeTab === "recruiters") {
        const { data } = await API.get("/recruiters");
        setRecruiters(data);
      } else if (activeTab === "applications") {
        const { data } = await API.get("/applications");
        setApplications(data.applications || []);
      } else if (activeTab === "reviews") {
        // For demo purposes, fetch from localStorage
        // In production, this would be: const { data } = await API.get("/reviews");
        const storedReviews = JSON.parse(localStorage.getItem('venus_reviews') || '[]');
        setReviews(storedReviews);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await API.delete(`/jobs/${jobId}`);
        setJobs(jobs.filter(job => job._id !== jobId));
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Failed to delete job");
      }
    }
  };

  const handleDeleteRecruiter = async (recruiterId) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      try {
        await API.delete(`/recruiters/${recruiterId}`);
        setRecruiters(recruiters.filter(recruiter => recruiter._id !== recruiterId));
      } catch (err) {
        console.error("Error deleting recruiter:", err);
        alert("Failed to delete recruiter");
      }
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await API.delete(`/applications/${applicationId}`);
        setApplications(applications.filter(app => app._id !== applicationId));
      } catch (err) {
        console.error("Error deleting application:", err);
        alert("Failed to delete application");
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        // For demo purposes, update localStorage
        // In production, this would be: await API.delete(`/reviews/${reviewId}`);
        const storedReviews = JSON.parse(localStorage.getItem('venus_reviews') || '[]');
        const updatedReviews = storedReviews.filter(review => review._id !== reviewId);
        localStorage.setItem('venus_reviews', JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
      } catch (err) {
        console.error("Error deleting review:", err);
        alert("Failed to delete review");
      }
    }
  };

  const handleToggleReviewStatus = async (reviewId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'approved' ? 'pending' : 'approved';
      // For demo purposes, update localStorage
      // In production, this would be: await API.put(`/reviews/${reviewId}`, { status: newStatus });
      const storedReviews = JSON.parse(localStorage.getItem('venus_reviews') || '[]');
      const updatedReviews = storedReviews.map(review => 
        review._id === reviewId 
          ? { ...review, status: newStatus }
          : review
      );
      localStorage.setItem('venus_reviews', JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
    } catch (err) {
      console.error("Error updating review status:", err);
      alert("Failed to update review status");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name || user?.email}</p>
        </header>

        <div className="dashboard-tabs">
          <button 
            className={activeTab === "jobs" ? "active" : ""}
            onClick={() => setActiveTab("jobs")}
          >
            Jobs ({jobs.length})
          </button>
          <button 
            className={activeTab === "recruiters" ? "active" : ""}
            onClick={() => setActiveTab("recruiters")}
          >
            Recruiters ({recruiters.length})
          </button>
          <button 
            className={activeTab === "applications" ? "active" : ""}
            onClick={() => setActiveTab("applications")}
          >
            Applications ({applications.length})
          </button>
          <button 
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {activeTab === "jobs" && (
                <JobsTab 
                  jobs={jobs}
                  onEdit={(job) => {
                    setEditingJob(job);
                    setShowJobModal(true);
                  }}
                  onDelete={handleDeleteJob}
                  onAdd={() => {
                    setEditingJob(null);
                    setShowJobModal(true);
                  }}
                />
              )}

              {activeTab === "recruiters" && (
                <RecruitersTab 
                  recruiters={recruiters}
                  onEdit={(recruiter) => {
                    setEditingRecruiter(recruiter);
                    setShowRecruiterModal(true);
                  }}
                  onDelete={handleDeleteRecruiter}
                  onAdd={() => {
                    setEditingRecruiter(null);
                    setShowRecruiterModal(true);
                  }}
                />
              )}

              {activeTab === "applications" && (
                <ApplicationsTab 
                  applications={applications}
                  onDelete={handleDeleteApplication}
                />
              )}

              {activeTab === "reviews" && (
                <ReviewsTab 
                  reviews={reviews}
                  onDelete={handleDeleteReview}
                  onToggleStatus={handleToggleReviewStatus}
                />
              )}
            </>
          )}
        </div>

        {showJobModal && (
          <JobModal
            job={editingJob}
            onClose={() => {
              setShowJobModal(false);
              setEditingJob(null);
            }}
            onSave={() => {
              setShowJobModal(false);
              setEditingJob(null);
              fetchData();
            }}
          />
        )}

        {showRecruiterModal && (
          <RecruiterModal
            recruiter={editingRecruiter}
            onClose={() => {
              setShowRecruiterModal(false);
              setEditingRecruiter(null);
            }}
            onSave={() => {
              setShowRecruiterModal(false);
              setEditingRecruiter(null);
              fetchData();
            }}
          />
        )}
      </div>
    </div>
  );
};

const JobsTab = ({ jobs, onEdit, onDelete, onAdd }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Job Management</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          Add New Job
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.department}</td>
                <td>{job.location}</td>
                <td>{job.type}</td>
                <td>
                  <span className={`status ${job.isActive ? 'active' : 'inactive'}`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => onEdit(job)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RecruitersTab = ({ recruiters, onEdit, onDelete, onAdd }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Recruiter Management</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          Add New Recruiter
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map(recruiter => (
              <tr key={recruiter._id}>
                <td>{recruiter.name}</td>
                <td>{recruiter.email}</td>
                <td>{new Date(recruiter.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => onEdit(recruiter)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(recruiter._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ApplicationsTab = ({ applications, onDelete }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Application Management</h2>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application._id}>
                <td>{application.name}</td>
                <td>{application.email}</td>
                <td>{application.jobId?.title || 'N/A'}</td>
                <td>
                  <span className={`status ${application.status}`}>
                    {application.status}
                  </span>
                </td>
                <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(application._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const JobModal = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    department: job?.department || "",
    location: job?.location || "",
    type: job?.type || "Full-Time",
    description: job?.description || "",
    tags: job?.tags?.join(", ") || "",
    isActive: job?.isActive ?? true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };

      if (job) {
        await API.put(`/jobs/${job._id}`, data);
      } else {
        await API.post("/jobs", data);
      }

      onSave();
    } catch (err) {
      console.error("Error saving job:", err);
      alert("Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{job ? "Edit Job" : "Add New Job"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="React, JavaScript, Node.js"
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              />
              Active
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RecruiterModal = ({ recruiter, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: recruiter?.name || "",
    email: recruiter?.email || "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { ...formData };
      if (!recruiter && !data.password) {
        alert("Password is required for new recruiters");
        setLoading(false);
        return;
      }

      if (recruiter) {
        // Update existing recruiter
        if (data.password) {
          await API.put(`/recruiters/${recruiter._id}`, data);
        } else {
          // Don't send password if not provided
          const { password, ...updateData } = data;
          await API.put(`/recruiters/${recruiter._id}`, updateData);
        }
      } else {
        // Create new recruiter
        await API.post("/recruiters", data);
      }

      onSave();
    } catch (err) {
      console.error("Error saving recruiter:", err);
      alert("Failed to save recruiter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recruiter ? "Edit Recruiter" : "Add New Recruiter"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Password {!recruiter && "*"}</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required={!recruiter}
              placeholder={recruiter ? "Leave blank to keep current password" : ""}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Recruiter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ReviewsTab = ({ reviews, onDelete, onToggleStatus }) => {
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Review Management</h2>
        <div className="review-stats">
          <span className="stat-item">
            Total: {reviews.length}
          </span>
          <span className="stat-item">
            Approved: {reviews.filter(r => r.status === 'approved').length}
          </span>
          <span className="stat-item">
            Pending: {reviews.filter(r => r.status === 'pending').length}
          </span>
        </div>
      </div>

      <div className="reviews-container">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>No reviews submitted yet.</p>
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map(review => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="review-meta">
                    <h4 className="reviewer-name">{review.name}</h4>
                    <p className="reviewer-company">{review.company}</p>
                    <div className="review-rating">
                      <span className="stars">{renderStars(review.rating)}</span>
                      <span className="rating-number">({review.rating}/5)</span>
                    </div>
                  </div>
                  <div className="review-status">
                    <span className={`status-badge ${review.status}`}>
                      {review.status}
                    </span>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="review-content">
                  <p className="review-text">{review.review}</p>
                </div>
                
                <div className="review-actions">
                  <button 
                    className={`btn btn-sm ${review.status === 'approved' ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => onToggleStatus(review._id, review.status)}
                  >
                    {review.status === 'approved' ? 'Unapprove' : 'Approve'}
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(review._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
