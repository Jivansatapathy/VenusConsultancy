// server/src/models/Admin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, default: "admin" },
}, { timestamps: true });

// hash password before save
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// helper to check password
AdminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
