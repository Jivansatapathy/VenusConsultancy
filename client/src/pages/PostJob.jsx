import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-Time",
    description: "",
    tags: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ You must login as Admin first");
      navigate("/admin/login");
      return;
    }

    try {
      const jobData = {
        ...form,
        tags: form.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };
      await API.post("/jobs", jobData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("✅ Job posted successfully!");
      setForm({
        title: "",
        department: "",
        location: "",
        type: "Full-Time",
        description: "",
        tags: ""
      });
    } catch (err) {
      setMessage("❌ Failed to post job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ clear token
    navigate("/admin/login"); // redirect to login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light">
      <div className="flex justify-between w-96 mb-4">
        <h2 className="text-2xl font-bold text-primary">Post a Job</h2>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-black px-3 py-1 rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg w-96">
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-red-700"
        >
          Post Job
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default PostJob;
