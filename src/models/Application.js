import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  coverMessage: { type: String, maxlength: 1000, default: "" },
  resumePath: { type: String, required: true },
  resumeOriginalName: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["new", "shortlisted", "rejected"], 
    default: "new" 
  },
  notes: { type: String, default: "" },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for efficient queries
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ email: 1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
