// server/src/models/OTP.js
import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userModel: { type: String, required: true, enum: ["Admin", "Recruiter"] },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Index for faster lookups
OTPSchema.index({ email: 1, verified: 1 });
OTPSchema.index({ userId: 1, verified: 1 });

const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;

