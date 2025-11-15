'use client';

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../src/context/AuthContext";
import API from "../../../src/utils/api";
import PrivateRoute from "../../../src/components/PrivateRoute";
import "../../../src/pages/AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
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
        const storedReviews = JSON.parse(localStorage.getItem('venus_reviews') || '[]');
        setReviews(storedReviews);
      } else if (activeTab === "bookings") {
        const { data } = await API.get("/bookings");
        setBookings(data.bookings || []);
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

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await API.delete(`/bookings/${bookingId}`);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert("Failed to delete booking");
      }
    }
  };

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name || user?.email}</p>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={activeTab === "jobs" ? "active" : ""}
            onClick={() => setActiveTab("jobs")}
          >
            Jobs
          </button>
          <button 
            className={activeTab === "recruiters" ? "active" : ""}
            onClick={() => setActiveTab("recruiters")}
          >
            Recruiters
          </button>
          <button 
            className={activeTab === "applications" ? "active" : ""}
            onClick={() => setActiveTab("applications")}
          >
            Applications
          </button>
          <button 
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
          <button 
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {activeTab === "jobs" && (
                <div className="tab-content">
                  <div className="content-header">
                    <h2>Jobs Management</h2>
                    <button onClick={() => { setEditingJob(null); setShowJobModal(true); }}>
                      Add New Job
                    </button>
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Department</th>
                          <th>Location</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job) => (
                          <tr key={job._id}>
                            <td>{job.title}</td>
                            <td>{job.department}</td>
                            <td>{job.location}</td>
                            <td>{job.type}</td>
                            <td>
                              <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "recruiters" && (
                <div className="tab-content">
                  <div className="content-header">
                    <h2>Recruiters Management</h2>
                    <button onClick={() => { setEditingRecruiter(null); setShowRecruiterModal(true); }}>
                      Add New Recruiter
                    </button>
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recruiters.map((recruiter) => (
                          <tr key={recruiter._id}>
                            <td>{recruiter.name}</td>
                            <td>{recruiter.email}</td>
                            <td>
                              <button onClick={() => handleDeleteRecruiter(recruiter._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "applications" && (
                <div className="tab-content">
                  <h2>Applications</h2>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Applicant Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr key={app._id}>
                            <td>{app.job?.title || 'N/A'}</td>
                            <td>{app.name}</td>
                            <td>{app.email}</td>
                            <td>{app.status || 'Pending'}</td>
                            <td>
                              <button onClick={() => handleDeleteApplication(app._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="tab-content">
                  <h2>Reviews</h2>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Company</th>
                          <th>Rating</th>
                          <th>Review</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map((review) => (
                          <tr key={review._id}>
                            <td>{review.name}</td>
                            <td>{review.company}</td>
                            <td>{'⭐'.repeat(review.rating)}</td>
                            <td>{review.review.substring(0, 50)}...</td>
                            <td>{review.status || 'Pending'}</td>
                            <td>
                              <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="tab-content">
                  <h2>Bookings</h2>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Call Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking._id}>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.phone}</td>
                            <td>{booking.preferredDate}</td>
                            <td>{booking.preferredTime}</td>
                            <td>{booking.callType}</td>
                            <td>
                              <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminDashboard;

