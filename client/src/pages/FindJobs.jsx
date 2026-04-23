import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import "./FindJobs.css";
import FAQ from "../components/FAQ";

const STATIC_JOBS = [
  {
    _id: "embedded-systems-infrastructure-monitoring",
    title: "Embedded Systems Engineer – Infrastructure Monitoring",
    type: "Full-Time",
    location: "New York, NY / Chicago, IL",
    department: "Engineering",
    description: "Develop monitoring and sensing systems for bridges, tunnels, and large civil infrastructure. Lead embedded firmware and sensor integration for real-time structural health insights.",
    tags: ["Embedded", "C/C++", "Sensors", "Infrastructure"],
  },
  {
    _id: "systems-integration-engineer-smart-construction",
    title: "Systems Integration Engineer",
    type: "Full-Time",
    location: "Houston, TX / Boston, MA",
    department: "Systems Engineering",
    description: "Integrate embedded IoT devices with construction and automation systems. Build reliable interfaces between field hardware and cloud monitoring platforms.",
    tags: ["IoT", "Integration", "Networking", "Automation"],
  },
  {
    _id: "embedded-systems-engineer-civil-infrastructure",
    title: "Embedded Systems Engineer",
    type: "Full-Time",
    location: "New York, NY / Chicago, IL",
    department: "Engineering",
    description: "Develop firmware and sensor-based monitoring systems for highways, tunnels, and other civil infrastructure with a focus on low-power deployment.",
    tags: ["Firmware", "Data Acquisition", "Low Power", "Civil Infrastructure"],
  },
  {
    _id: "systems-integration-engineer-smart-construction-ii",
    title: "Systems Integration Engineer",
    type: "Full-Time",
    location: "Houston, TX / Boston, MA",
    department: "Integration",
    description: "Support smart construction initiatives by connecting embedded systems, digital platforms, and field devices for deployed infrastructure projects.",
    tags: ["Field Integration", "IoT", "Communication", "Validation"],
  },
  {
    _id: "construction-field-technology-engineer",
    title: "Construction Field Technology Engineer",
    type: "Full-Time",
    location: "California / Texas",
    department: "Field Operations",
    description: "Deploy, maintain, and troubleshoot embedded sensors and wireless monitoring systems on construction and infrastructure sites.",
    tags: ["Field Technology", "Calibration", "Wireless", "Troubleshooting"],
  },
  {
    _id: "welder-industrial-manufacturing",
    title: "Welder – Industrial Manufacturing (Tier I Automotive Supplier)",
    type: "Full-Time",
    location: "Tennessee",
    department: "Manufacturing",
    description: "Perform MIG, TIG, and spot welding for high-volume automotive and industrial components while maintaining quality and production efficiency.",
    tags: ["Welding", "Fabrication", "Automotive", "Quality"],
  },
  {
    _id: "industrial-maintenance-technician",
    title: "Industrial Maintenance Technician – Manufacturing Equipment Support",
    type: "Full-Time",
    location: "Tennessee",
    department: "Maintenance",
    description: "Maintain uptime for production equipment by troubleshooting mechanical, electrical, hydraulic, and pneumatic systems in manufacturing environments.",
    tags: ["Maintenance", "Troubleshooting", "CNC", "Reliability"],
  },
  {
    _id: "tool-room-machinist-precision-manufacturing",
    title: "Tool Room Machinist – Precision Manufacturing (Tier I Automotive Supplier)",
    type: "Full-Time",
    location: "Tennessee",
    department: "Tooling",
    description: "Operate CNC and manual machining equipment to manufacture and maintain precision tools, fixtures, and dies for automotive production systems.",
    tags: ["Machining", "CNC", "Precision", "GD&T"],
  },
  {
    _id: "python-backend-engineer-ai-platform",
    title: "Python Backend Engineer – AI Platform",
    type: "Full-Time",
    location: "Remote / San Francisco / Austin",
    department: "Technology",
    description: "Build scalable Python APIs and microservices for AI-driven SaaS products, integrating machine learning models into cloud-native backend systems.",
    tags: ["Python", "AWS/GCP", "APIs", "AI"],
  },
  {
    _id: "principal-engineer-ai-systems",
    title: "Principal Engineer – AI Systems",
    type: "Full-Time",
    location: "San Francisco, CA / Remote",
    department: "Leadership",
    description: "Lead architecture for AI-first platforms and scalable distributed systems, driving performance, reliability, and security across teams.",
    tags: ["Distributed Systems", "AI", "Architecture", "Leadership"],
  },
  {
    _id: "founding-engineer-ai-startup",
    title: "Founding Engineer – AI Startup (USA)",
    type: "Full-Time",
    location: "Remote / Bay Area / Austin",
    department: "Startup Engineering",
    description: "Build MVP infrastructure and core platform systems from scratch for an early-stage AI startup, working closely with founders on rapid product delivery.",
    tags: ["Startup", "Full-Stack", "Rapid Prototyping", "AI"],
  },
  {
    _id: "qa-automation-engineer-ai-saas",
    title: "QA Automation Engineer – AI / SaaS Platform (USA)",
    type: "Full-Time",
    location: "Remote / USA",
    department: "Quality Assurance",
    description: "Develop automation frameworks and CI/CD test coverage for AI SaaS products, ensuring API reliability and performance across releases.",
    tags: ["QA", "Automation", "API Testing", "CI/CD"],
  },
  {
    _id: "devops-engineer-ai-infrastructure",
    title: "DevOps Engineer – AI Infrastructure (USA)",
    type: "Full-Time",
    location: "Remote / Austin / NYC",
    department: "DevOps",
    description: "Manage cloud infrastructure, containerized deployments, and reliability tooling for AI and SaaS infrastructure in AWS/GCP environments.",
    tags: ["DevOps", "Kubernetes", "Cloud", "Automation"],
  },
];

const USE_STATIC_JOBS = true;

const filterJobs = (jobList, filters) => {
  const { search, type, location, department, tags } = filters;
  return jobList.filter((job) => {
    const searchableText = [job.title, job.description, job.department, job.location].join(" ").toLowerCase();
    const jobTagsText = (job.tags || []).join(" ").toLowerCase();

    if (search) {
      const query = search.toLowerCase();
      if (!searchableText.includes(query) && !jobTagsText.includes(query)) {
        return false;
      }
    }

    if (type && job.type !== type) {
      return false;
    }

    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    if (department && !job.department.toLowerCase().includes(department.toLowerCase())) {
      return false;
    }

    if (tags) {
      const tagQueries = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
      if (tagQueries.length > 0 && !tagQueries.some((tag) => jobTagsText.includes(tag))) {
        return false;
      }
    }

    return true;
  });
};

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
      if (USE_STATIC_JOBS) {
        const filteredJobs = filterJobs(STATIC_JOBS, filters);
        setJobs(filteredJobs);
        setPagination({ total: 1, totalJobs: filteredJobs.length, current: 1 });
        return;
      }

      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const { data } = await API.get(`/jobs?${params.toString()}`);
      setJobs(data.jobs || STATIC_JOBS);
      setPagination(data.pagination || { total: 1, totalJobs: data.jobs?.length || STATIC_JOBS.length, current: 1 });
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs(STATIC_JOBS);
      setPagination({ total: 1, totalJobs: STATIC_JOBS.length, current: 1 });
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
  return (
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

        <Link to="/contact" className="btn btn-primary apply-btn">
          Apply Now
        </Link>
      </div>
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

export default FindJobs;
