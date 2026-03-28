const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },

  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);