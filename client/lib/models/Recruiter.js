// server/src/models/Recruiter.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, default: "recruiter" },
  createdAt: { type: Date, default: Date.now },
});

// hash password before save
recruiterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// helper to check password
recruiterSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
