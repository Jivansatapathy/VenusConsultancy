// server/src/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  callType: {
    type: String,
    required: true,
    enum: ['consultation', 'executive-search', 'leadership-hiring', 'board-advisory', 'talent-advisory'],
    default: 'consultation'
  },
  preferredDate: {
    type: Date,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true,
    enum: ['EST', 'CST', 'MST', 'PST', 'GMT'],
    default: 'EST'
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  confirmedDateTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
bookingSchema.index({ email: 1, createdAt: -1 });
bookingSchema.index({ status: 1, preferredDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
