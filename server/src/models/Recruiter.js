import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hiringNeeds: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
