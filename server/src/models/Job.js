import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"], default: "Full-Time" },
  department: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for search functionality
jobSchema.index({ title: "text", description: "text", tags: "text", department: "text" });

const Job = mongoose.model("Job", jobSchema);

export default Job;
