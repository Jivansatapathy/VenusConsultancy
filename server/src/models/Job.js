import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["Full-Time", "Part-Time", "Internship"], default: "Full-Time" },
  description: { type: String, required: true },
  salary: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
