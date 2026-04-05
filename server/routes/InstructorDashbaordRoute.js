const express= require("express");
const { getStatusData, getStatsData } = require("../controllers/instructorDashboard/statsController");
const isInstructor = require("../middlewares/instructorMiddleware");
const isAuthenticated=require("../middlewares/authMiddleware");
const { getAllCourses, getSingleCourseInfo, updateCourse, createCourse, deleteCourse, publishCourse } = require("../controllers/instructorDashboard/coursesController");
const upload = require("../middlewares/uploadImageMiddleware");
const { getLessons, getSingleLesson, createLesson, updateLesson, deleteLesson } = require("../controllers/instructorDashboard/lessonController");
const uploadVideo = require("../middlewares/videoUploadMiddleware");
const { allEnrolledStudents, deleteEnrollment, getStudentsProgress } = require("../controllers/instructorDashboard/studentsController");
const { getAllCertificateIssued } = require("../controllers/instructorDashboard/certificateController");
const instructorDashboardRoute=express.Router();


instructorDashboardRoute.get('/stats',isAuthenticated,isInstructor,getStatsData);
// lesson route
instructorDashboardRoute.get('/lessons/:courseId',isAuthenticated,isInstructor,getLessons);
instructorDashboardRoute.get('/lessons/:courseId/:lessonId',isAuthenticated,isInstructor,getSingleLesson);
instructorDashboardRoute.post('/lesson/create/:courseId',isAuthenticated,isInstructor,uploadVideo.single('video'),createLesson);
instructorDashboardRoute.put('/lesson/:lessonId',isAuthenticated,isInstructor,uploadVideo.single('video'),updateLesson);
instructorDashboardRoute.delete('/lesson/:lessonId',isAuthenticated,isInstructor,deleteLesson);

// course Routes
instructorDashboardRoute.get('/courses',isAuthenticated,isInstructor,getAllCourses);
instructorDashboardRoute.put('/course/:courseId',isAuthenticated,isInstructor,upload.single("image"),updateCourse);
instructorDashboardRoute.post('/course/create',isAuthenticated,isInstructor,upload.single("image"),createCourse);
instructorDashboardRoute.get('/course/:courseId',isAuthenticated,isInstructor,getSingleCourseInfo);
instructorDashboardRoute.put('/course/status/:courseId',isAuthenticated,isInstructor,publishCourse);
instructorDashboardRoute.delete('/course/:courseId',isAuthenticated,isInstructor,deleteCourse);

// enrollment
instructorDashboardRoute.delete('/enrollment/:enrollmentId',isAuthenticated,isInstructor,deleteEnrollment);
// students
instructorDashboardRoute.get('/students',isAuthenticated,isInstructor,allEnrolledStudents);
instructorDashboardRoute.get('/students/progress',isAuthenticated,isInstructor,getStudentsProgress);
// certificates
instructorDashboardRoute.get('/certificates',isAuthenticated,isInstructor,getAllCertificateIssued);
module.exports=instructorDashboardRoute;