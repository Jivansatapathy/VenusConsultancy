import { useEffect, useState } from "react";
import API from "../utils/api";

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/jobs");
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-light min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Available Jobs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} — {job.location}</p>
            <p className="text-sm mt-2">{job.description}</p>
            <p className="mt-2 font-bold">{job.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindJobs;
