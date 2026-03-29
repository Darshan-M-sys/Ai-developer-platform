const express=require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const isStudent = require("../middlewares/Student");
const { getOverViewData } = require("../controllers/learnerDashboard/overViewContoller");
const { getEnrolledCourses, getEnrolledSingleCourse, cancelEnrollment } = require("../controllers/learnerDashboard/enrolledCourseController");
const learnerDashboardRoute=express.Router();

learnerDashboardRoute.get("/stats",isAuthenticated,isStudent,getOverViewData);
learnerDashboardRoute.get("/enrollment/all",isAuthenticated,isStudent,getEnrolledCourses);
learnerDashboardRoute.get("/enrollment/:enrollmentId",isAuthenticated,isStudent,getEnrolledSingleCourse);
learnerDashboardRoute.delete("/enrollment/:enrollmentId",isAuthenticated,isStudent,cancelEnrollment);
// lesson controllers
const { getAllLessons,getLessonById } = require("../controllers/learnerDashboard/lessonController");
learnerDashboardRoute.get("/lessons/all/:courseId", isAuthenticated, isStudent, getAllLessons);
learnerDashboardRoute.get("/lessons/:courseId/:lessonId/", isAuthenticated, isStudent, getLessonById);

// course progress routes
const { createCourseProgress, getCourseProgress, updateLessonProgress,unMarkLessonComplete } = require("../controllers/learnerDashboard/courseProgressController");
learnerDashboardRoute.post("/course-progress/:courseId", isAuthenticated, isStudent, createCourseProgress);
learnerDashboardRoute.get("/course-progress/:courseId", isAuthenticated, isStudent, getCourseProgress);
learnerDashboardRoute.put("/course-progress/:courseId", isAuthenticated, isStudent, updateLessonProgress);
learnerDashboardRoute.delete("/course-progress/:courseId", isAuthenticated, isStudent, unMarkLessonComplete);

module.exports=learnerDashboardRoute;
