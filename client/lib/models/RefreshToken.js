// server/src/models/RefreshToken.js
import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "userModel" },
  tokenHash: { type: String, required: true }, // hashed token
  userModel: { type: String, enum: ["Admin", "Recruiter"], required: true },
  userAgent: { type: String, default: "" },
  ip: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  rotatedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "RefreshToken", default: null }, // original token id (rotation)
  revoked: { type: Boolean, default: false },
});

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
export default RefreshToken;
