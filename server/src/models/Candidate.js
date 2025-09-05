import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String }, // can be a URL to uploaded resume
  appliedJob: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  createdAt: { type: Date, default: Date.now }
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
