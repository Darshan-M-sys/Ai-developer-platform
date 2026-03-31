const mongoose = require('mongoose');
const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  certificateUrl: { type: String, required: true },
  certificateThumbnailUrl: { type: String, required: true },
  certificateId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);