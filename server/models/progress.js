const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  lessonProgress: [{
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    progress: { type: Number, default: 0 }, // percentage of completion
  }],
  courseCompletion: { type: Number, default: 0 }, // percentage of course completion
  currentLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  lastAccessed: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);