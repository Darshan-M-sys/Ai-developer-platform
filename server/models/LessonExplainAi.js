const mongoose = require("mongoose");

const LessonExplainAiSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: String, required: true },
  quizData: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("LessonExplainAi", LessonExplainAiSchema);