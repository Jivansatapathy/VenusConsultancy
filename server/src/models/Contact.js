import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
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
  source: {
    type: String,
    default: 'Not specified',
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'responded', 'closed'],
    default: 'new'
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailError: {
    type: String,
    default: null
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
contactSchema.index({ email: 1, submittedAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ submittedAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
