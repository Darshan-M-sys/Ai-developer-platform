const express = require("express");
const AiLessonActionsRoute = express.Router();
const {explainLesson} = require("../controllers/learnerDashboard/AiActionsLessonController");
const {createQuiz} = require("../controllers/learnerDashboard/QuizLessonAiController");

AiLessonActionsRoute.post("/explain/:courseId/:lessonId", explainLesson);
AiLessonActionsRoute.post("/quiz/:courseId/:lessonId", createQuiz);
module.exports = AiLessonActionsRoute;