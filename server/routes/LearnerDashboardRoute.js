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
const { createCourseProgress, getCourseProgress, updateLessonProgress,markLessonComplete,getProgressByLesson, setCurrentLesson } = require("../controllers/learnerDashboard/courseProgressController");
learnerDashboardRoute.post("/course-progress/:courseId", isAuthenticated, isStudent, createCourseProgress);
learnerDashboardRoute.get("/course/progress/:courseId", isAuthenticated, isStudent, getCourseProgress);
learnerDashboardRoute.get("/lesson/progress/:courseId/:lessonId", isAuthenticated, isStudent, getProgressByLesson);
learnerDashboardRoute.put("/lesson/progress/:courseId/:lessonId", isAuthenticated, isStudent, updateLessonProgress);
learnerDashboardRoute.put("/course/current/:courseId/:lessonId", isAuthenticated, isStudent, setCurrentLesson);
learnerDashboardRoute.put("/course/progress/:courseId/:lessonId", isAuthenticated, isStudent, markLessonComplete);



// certificate route
const { getIsCreateCertificate, generateCertificate, getCertificates } = require("../controllers/learnerDashboard/CertificateController");
const certificate_upload = require("../middlewares/CertifcateUploadMiddleWare");
learnerDashboardRoute.get("/certificate/completed/courses", isAuthenticated, isStudent, getIsCreateCertificate);
learnerDashboardRoute.get("/certificates/", isAuthenticated, isStudent, getCertificates);
learnerDashboardRoute.post("/certificate/generate/:courseId", isAuthenticated, isStudent,certificate_upload.fields([
  {name:"certificatePdf" , maxCount:1},
  {name:"certificateThumbnail",maxCount:1}
]), generateCertificate);
module.exports=learnerDashboardRoute;
