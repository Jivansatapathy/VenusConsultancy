import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAllIndustries, getJobRolesByIndustry } from "../data/jobRolesData";
import "./JobRoles.css";

const JobRoles = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const industries = getAllIndustries();
  const allIndustries = ["All", ...industries];

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getFilteredJobRoles = () => {
    if (selectedIndustry === "All") {
      return Object.entries(require("../data/jobRolesData").jobRolesData)
        .map(([key, data]) => ({ key, ...data }));
    }
    return getJobRolesByIndustry(selectedIndustry);
  };

  const filteredJobRoles = getFilteredJobRoles();

  return (
    <div className="job-roles-page">
      {/* Header */}
      <div className="job-roles-header">
        <div className="job-roles-container">
          <h1>Job Roles</h1>
          <p>Explore career opportunities across all industries</p>
        </div>
      </div>

      {/* Industry Filter */}
      <div className="job-roles-filters">
        <div className="job-roles-container">
          <div className="filter-tabs">
            {allIndustries.map((industry) => (
              <button
                key={industry}
                className={`filter-tab ${selectedIndustry === industry ? 'active' : ''}`}
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Roles Grid */}
      <div className="job-roles-content">
        <div className="job-roles-container">
          <div className="job-roles-grid">
            {filteredJobRoles.map((job) => (
              <Link
                key={job.key}
                to={`/hiring/${job.key}`}
                className="job-role-card"
              >
                <div className="job-role-header">
                  <h3>{job.title}</h3>
                  <span className="job-role-industry">{job.industry}</span>
                </div>
                
                <div className="job-role-salary">
                  <span className="salary-range">
                    {formatSalary(job.salary.low)} - {formatSalary(job.salary.high)}
                  </span>
                </div>
                
                <div className="job-role-description">
                  <p>{job.description.substring(0, 150)}...</p>
                </div>
                
                <div className="job-role-footer">
                  <span className="view-details">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="job-roles-cta">
        <div className="job-roles-container">
          <div className="cta-content">
            <h2>Can't find what you're looking for?</h2>
            <p>Contact our recruitment team to discuss your specific requirements</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              <Link to="/book-call" className="btn btn-outline">Book a Call</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRoles;
