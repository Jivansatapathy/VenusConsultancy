// server/src/models/Content.js
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null
  }
}, {
  timestamps: true
});

// Only one content document should exist
contentSchema.statics.getContent = async function() {
  let content = await this.findOne();
  if (!content) {
    content = new this({ data: {} });
    await content.save();
  }
  return content;
};

const Content = mongoose.model("Content", contentSchema);

export default Content;

