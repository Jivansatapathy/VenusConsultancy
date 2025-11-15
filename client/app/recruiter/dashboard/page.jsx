'use client';

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../src/context/AuthContext";
import API from "../../../src/utils/api";
import PrivateRoute from "../../../src/components/PrivateRoute";
import "../../../src/pages/RecruiterDashboard.css";

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
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
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

  return (
    <PrivateRoute allowedRoles={["recruiter", "admin"]}>
      <div className="recruiter-dashboard">
        <div className="dashboard-header">
          <h1>Recruiter Dashboard</h1>
          <p>Welcome, {user?.name || user?.email}</p>
        </div>

        <div className="dashboard-filters">
          <div className="filter-group">
            <label>Filter by Job:</label>
            <input
              type="text"
              placeholder="Job ID or Title"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="interviewing">Interviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <div className="loading">Loading applications...</div>
          ) : (
            <div className="applications-table">
              <table>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Applicant Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td>{app.job?.title || 'N/A'}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone || 'N/A'}</td>
                      <td>
                        <span className={`status-badge status-${app.status || 'pending'}`}>
                          {app.status || 'Pending'}
                        </span>
                      </td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          onClick={() => downloadResume(app._id)}
                          className="btn-download"
                        >
                          Download Resume
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedApplication(app);
                            setShowApplicationModal(true);
                          }}
                          className="btn-update"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showApplicationModal && selectedApplication && (
          <ApplicationStatusModal
            application={selectedApplication}
            onUpdate={handleStatusUpdate}
            onClose={() => {
              setShowApplicationModal(false);
              setSelectedApplication(null);
            }}
          />
        )}
      </div>
    </PrivateRoute>
  );
};

const ApplicationStatusModal = ({ application, onUpdate, onClose }) => {
  const [status, setStatus] = useState(application.status || 'pending');
  const [notes, setNotes] = useState(application.notes || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(application._id, status, notes);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Update Application Status</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="interviewing">Interviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add any notes about this application..."
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Update Status</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterDashboard;

