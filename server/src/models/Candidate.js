// server/src/models/Candidate.js
import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: "" }, // current role / headline
    email: { type: String, default: "" },
    personalEmail: { type: String, default: "" }, // intentionally sensitive
    summary: { type: String, default: "" },
    location: { type: String, default: "" },
    skills: { type: [String], default: [] },
    experience: { type: Number, default: 0 }, // years
    avatar: { type: String, default: "" },
    remote: { type: Boolean, default: false },
    appliedJob: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
  },
  { timestamps: true }
);

// optional text index for better searching (enable if you want)
CandidateSchema.index({ name: "text", title: "text", summary: "text", skills: "text" });

const Candidate = mongoose.model("Candidate", CandidateSchema);
export default Candidate;
