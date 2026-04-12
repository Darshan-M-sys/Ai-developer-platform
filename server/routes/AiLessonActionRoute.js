const express = require("express");
const AiLessonActionsRoute = express.Router();
const {explainLesson, generateLessonNotes} = require("../controllers/learnerDashboard/AiActionsLessonController");
const {createQuiz} = require("../controllers/learnerDashboard/QuizLessonAiController");

AiLessonActionsRoute.post("/explain/:courseId/:lessonId", explainLesson);
AiLessonActionsRoute.post("/notes/:courseId/:lessonId", generateLessonNotes);
module.exports = AiLessonActionsRoute;