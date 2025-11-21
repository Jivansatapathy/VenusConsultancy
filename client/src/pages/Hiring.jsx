import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getJobRoleByKey, getAllIndustries, getJobRolesByIndustry, jobRolesData } from "../data/jobRolesData";
import "./Hiring.css";

const Hiring = () => {
  const { jobRole } = useParams();
  const navigate = useNavigate();
  
  const jobData = getJobRoleByKey(jobRole) || {
    title: "Product Support Specialist",
    industry: "Technology",
    salary: { low: 50750, mid: 62250, high: 77750 },
    description: `Product support specialists must have strong customer service, problem-solving and communication skills. This position assists users with issues and concerns regarding a company's products, offering software and technical support and resolving problems. Previous experience in customer and/or technical support may be preferred. Candidates will engage in moderate system design and architecture, building and improving upon current automation. A bachelor's degree is preferred as well as five or more years of prior relevant experience.`,
    duties: [
      "Providing technical and customer service support for a company's products",
      "Assisting users with product issues and concerns and communicating steps to resolve problems",
      "Identifying and analyzing problems with software and hardware, including failures, bugs and system issues",
      "Reporting issues and user concerns to leadership"
    ]
  };

  const relatedPositions = jobData.industry ? 
    getJobRolesByIndustry(jobData.industry)
      .filter(job => job.key !== jobRole)
      .slice(0, 8)
      .map(job => ({
        title: job.title,
        low: job.salary.low,
        mid: job.salary.mid,
        high: job.salary.high,
        key: job.key
      })) : 
    [
      { title: "IT Operations Manager", low: 117750, mid: 145250, high: 172750 },
      { title: "IT Manager", low: 108000, mid: 125500, high: 143000 },
      { title: "Help Desk Support Manager", low: 83750, mid: 103250, high: 115500 },
      { title: "Help Desk Tier 3", low: 59750, mid: 71000, high: 81750 },
      { title: "Help Desk Tier 2", low: 47750, mid: 59250, high: 66750 },
      { title: "Help Desk Tier 1", low: 41000, mid: 49750, high: 56500 },
      { title: "Instructor/Trainer", low: 70000, mid: 84250, high: 99000 },
      { title: "Desktop Support Analyst", low: 55500, mid: 66750, high: 78250 }
    ];

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="hiring-page">
      {/* Breadcrumb Navigation */}
      <div className="hiring-breadcrumb">
        <div className="hiring-container">
          <nav aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/services" className="breadcrumb-link">Services</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{jobData.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="hiring-main">
        <div className="hiring-container">
          <div className="hiring-layout">
            {/* Left Column - Job Details */}
            <div className="hiring-content">
              <h1 className="job-title">{jobData.title}</h1>
              
              <div className="job-description">
                <h2>{jobData.title} Job Description</h2>
                <p>{jobData.description}</p>
                
                <h3>Typical {jobData.title.toLowerCase()} duties:</h3>
                <ul className="duties-list">
                  {jobData.duties.map((duty, index) => (
                    <li key={index}>{duty}</li>
                  ))}
                </ul>
              </div>

              {/* CTA Section */}
              <div className="hiring-cta">
                <h3>Looking for a {jobData.title.toLowerCase()} or a {jobData.title.toLowerCase()} job?</h3>
                <p>
                  <a href="/contact" className="cta-link">Submit your resume</a> or <a href="/book-call" className="cta-link">request talent now</a> and our expert recruiters will be with you shortly. 
                  Venus Hiring can assist you with your <a href="/contact" className="cta-link">{jobData.title.toLowerCase()} recruitment needs</a> in the {jobData.industry} industry.
                </p>
                <div className="cta-actions">
                  <Link to="/job-roles" className="btn btn-outline">Browse All Job Roles</Link>
                  <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                </div>
              </div>
            </div>

            {/* Right Column - Salary Card */}
            <div className="hiring-sidebar">
              <div className="salary-card">
                <div className="salary-header">
                  <div className="bookmark-icon">🔖</div>
                  <h3>Salary for {jobData.title}</h3>
                </div>
                
                <div className="salary-range">
                  {formatSalary(jobData.salary.low)} - {formatSalary(jobData.salary.high)}
                </div>
                
                <div className="salary-breakdown">
                  <div className="salary-labels">
                    <span className="salary-label low">LOW</span>
                    <span className="salary-label mid">MID</span>
                    <span className="salary-label high">HIGH</span>
                  </div>
                  
                  <div className="salary-bar">
                    <div className="bar-segment low"></div>
                    <div className="bar-segment mid"></div>
                    <div className="bar-segment high"></div>
                  </div>
                  
                  <div className="salary-amounts">
                    <span className="salary-amount">{formatSalary(jobData.salary.low)}</span>
                    <span className="salary-amount">{formatSalary(jobData.salary.mid)}</span>
                    <span className="salary-amount">{formatSalary(jobData.salary.high)}</span>
                  </div>
                  
                  <div className="salary-arrows">
                    <div className="arrow low">▼</div>
                    <div className="arrow mid">▼</div>
                    <div className="arrow high">▼</div>
                  </div>
                  
                  <div className="salary-descriptions">
                    <p className="salary-desc">The candidate is new to the role or has limited experience and is building necessary skills.</p>
                    <p className="salary-desc">The candidate has moderate experience in the role, meets most requirements or has equivalent transferable skills, and may also have relevant certifications.</p>
                    <p className="salary-desc">The candidate has extensive experience and advanced skills for the role, and may also have specialized certifications.</p>
                  </div>
                </div>
                
                <div className="salary-footer">
                  <p>Projected salaries for related positions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Positions Table */}
      <div className="related-positions-section">
        <div className="hiring-container">
          <div className="positions-card">
            <h3>Projected salaries for related positions</h3>
            
            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot low"></div>
                <span>LOW</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot mid"></div>
                <span>MID</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot high"></div>
                <span>HIGH</span>
              </div>
            </div>
            
            <div className="positions-table">
              <div className="table-header">
                <span>JOB TITLE</span>
                <span>LOW</span>
                <span>MID</span>
                <span>HIGH</span>
              </div>
              {relatedPositions.map((position, index) => (
                <div key={index} className="table-row">
                  {position.key ? (
                    <Link to={`/hiring/${position.key}`} className="position-title">{position.title}</Link>
                  ) : (
                    <span className="position-title">{position.title}</span>
                  )}
                  <span className="position-salary">{formatSalary(position.low)}</span>
                  <span className="position-salary">{formatSalary(position.mid)}</span>
                  <span className="position-salary">{formatSalary(position.high)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hiring;
