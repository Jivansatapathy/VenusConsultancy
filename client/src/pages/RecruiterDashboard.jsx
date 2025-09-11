import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
import "./RecruiterDashboard.css";

const RecruiterDashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    if (user?.role === "recruiter" || user?.role === "admin") {
      fetchApplications();
    }
  }, [user, selectedJob, statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedJob) params.append("jobId", selectedJob);
      if (statusFilter) params.append("status", statusFilter);

      const { data } = await API.get(`/applications?${params.toString()}`);
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus, notes) => {
    try {
      await API.put(`/applications/${applicationId}`, {
        status: newStatus,
        notes: notes
      });
      
      // Update local state
      setApplications(applications.map(app => 
        app._id === applicationId 
          ? { ...app, status: newStatus, notes: notes, updatedAt: new Date() }
          : app
      ));
      
      setShowApplicationModal(false);
      setSelectedApplication(null);
    } catch (err) {
      console.error("Error updating application:", err);
      alert("Failed to update application");
    }
  };

  const downloadResume = async (applicationId) => {
    try {
      const response = await API.get(`/applications/${applicationId}/resume`, {
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'resume.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading resume:", err);
      alert("Failed to download resume");
    }
  };

  if (user?.role !== "recruiter" && user?.role !== "admin") {
    return (
      <div className="recruiter-dashboard">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You need recruiter or admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recruiter-dashboard">
      <div className="container">
        <header className="dashboard-header">
          <h1>Recruiter Dashboard</h1>
          <p>Welcome back, {user?.name || user?.email}</p>
        </header>

        <div className="dashboard-filters">
          <div className="filter-group">
            <label>Filter by Job:</label>
            <select 
              value={selectedJob} 
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="">All Jobs</option>
              {/* You could fetch jobs here if needed */}
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <div className="loading">Loading applications...</div>
          ) : (
            <div className="applications-grid">
              {applications.map(application => (
                <ApplicationCard
                  key={application._id}
                  application={application}
                  onViewDetails={(app) => {
                    setSelectedApplication(app);
                    setShowApplicationModal(true);
                  }}
                  onDownloadResume={() => downloadResume(application._id)}
                />
              ))}
            </div>
          )}

          {applications.length === 0 && !loading && (
            <div className="no-applications">
              <p>No applications found matching your criteria.</p>
            </div>
          )}
        </div>

        {showApplicationModal && selectedApplication && (
          <ApplicationModal
            application={selectedApplication}
            onClose={() => {
              setShowApplicationModal(false);
              setSelectedApplication(null);
            }}
            onStatusUpdate={handleStatusUpdate}
            onDownloadResume={() => downloadResume(selectedApplication._id)}
          />
        )}
      </div>
    </div>
  );
};

const ApplicationCard = ({ application, onViewDetails, onDownloadResume }) => {
  return (
    <div className="application-card">
      <div className="card-header">
        <h3>{application.name}</h3>
        <span className={`status ${application.status}`}>
          {application.status}
        </span>
      </div>

      <div className="card-details">
        <p><strong>Email:</strong> {application.email}</p>
        {application.phone && <p><strong>Phone:</strong> {application.phone}</p>}
        <p><strong>Job:</strong> {application.jobId?.title || 'N/A'}</p>
        <p><strong>Applied:</strong> {new Date(application.appliedAt).toLocaleDateString()}</p>
      </div>

      {application.coverMessage && (
        <div className="cover-message">
          <p><strong>Cover Message:</strong></p>
          <p className="message-preview">
            {application.coverMessage.length > 100 
              ? `${application.coverMessage.substring(0, 100)}...` 
              : application.coverMessage}
          </p>
        </div>
      )}

      {application.notes && (
        <div className="recruiter-notes">
          <p><strong>Notes:</strong></p>
          <p className="notes-preview">
            {application.notes.length > 100 
              ? `${application.notes.substring(0, 100)}...` 
              : application.notes}
          </p>
        </div>
      )}

      <div className="card-actions">
        <button 
          className="btn btn-primary"
          onClick={() => onViewDetails(application)}
        >
          View Details
        </button>
        <button 
          className="btn btn-outline"
          onClick={onDownloadResume}
        >
          Download Resume
        </button>
      </div>
    </div>
  );
};

const ApplicationModal = ({ application, onClose, onStatusUpdate, onDownloadResume }) => {
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.notes || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onStatusUpdate(application._id, status, notes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Application Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="application-info">
            <div className="info-section">
              <h3>Applicant Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name:</label>
                  <span>{application.name}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{application.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{application.phone || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <label>Applied Date:</label>
                  <span>{new Date(application.appliedAt).toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <label>Job Position:</label>
                  <span>{application.jobId?.title || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <label>Resume:</label>
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={onDownloadResume}
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            </div>

            {application.coverMessage && (
              <div className="info-section">
                <h3>Cover Message</h3>
                <div className="cover-message-full">
                  {application.coverMessage}
                </div>
              </div>
            )}

            <div className="info-section">
              <h3>Recruiter Actions</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Status:</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="new">New</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Notes:</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes about this candidate..."
                    rows={4}
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={onClose} disabled={loading}>
                    Close
                  </button>
                  <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Status"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
