const express=require("express");
const { usersStat } = require("../controllers/adminDashboardControllers/OverviewController");
const adminDashboardRoute=express.Router();
const upload =require("../middlewares/uploadImageMiddleware")
const isAdmin=require("../middlewares/adminMiddleware")
const isAuthenticated=require("../middlewares/authMiddleware");
const { getUsers, getSingleUser, updateUser, delateUser } = require("../controllers/adminDashboardControllers/ManageUsers");
const { createCourse, updateCourse, getSingleCourse, getAllCourses, deleteCourse } = require("../controllers/adminDashboardControllers/courseController");
const { getAllInstructors, addInstructors } = require("../controllers/adminDashboardControllers/instructorsControllers");
const uploadVideo = require("../middlewares/videoUploadMiddleware");
const { createLesson, updateLesson, deleteLesson, getSingleLesson, getAllLesson } = require("../controllers/adminDashboardControllers/lessonController");
const {  getAllStudents } = require("../controllers/adminDashboardControllers/studentController");
const { getEnrolledStudents } = require("../controllers/adminDashboardControllers/enrollmentController");

adminDashboardRoute.get("/stats",isAuthenticated,isAdmin,usersStat);
adminDashboardRoute.get("/users",isAuthenticated,isAdmin,getUsers);
adminDashboardRoute.get("/user/:userId",isAuthenticated,isAdmin,getSingleUser);
adminDashboardRoute.put("/user/:userId",isAuthenticated,isAdmin,upload.single("photo"),updateUser);
adminDashboardRoute.delete("/user/:userId",isAuthenticated,isAdmin,delateUser);
// Course management
adminDashboardRoute.post("/course",isAuthenticated,isAdmin,upload.single("image"),createCourse);
adminDashboardRoute.put("/course/:courseId",isAuthenticated,isAdmin,upload.single("image"),updateCourse);
adminDashboardRoute.get("/course",isAuthenticated,isAdmin,getAllCourses);
adminDashboardRoute.get("/course/:courseId",isAuthenticated,isAdmin,getSingleCourse);
adminDashboardRoute.delete("/course/:courseId",isAuthenticated,isAdmin,deleteCourse);
// instructor management
adminDashboardRoute.get("/instructors",isAuthenticated,isAdmin,getAllInstructors);
adminDashboardRoute.post("/instructors/create",isAuthenticated,isAdmin,upload.single("image"),addInstructors);
// lesson management
adminDashboardRoute.post("/lesson/create/:courseId",isAuthenticated,isAdmin,uploadVideo.single("video"),createLesson);
adminDashboardRoute.put("/lesson/:lessonId",isAuthenticated,isAdmin,uploadVideo.single("video"),updateLesson);
adminDashboardRoute.delete("/lesson/:lessonId",isAuthenticated,isAdmin,deleteLesson);
adminDashboardRoute.get("/lesson/:lessonId",isAuthenticated,isAdmin,getSingleLesson);
adminDashboardRoute.get("/lessons/:courseId",isAuthenticated,isAdmin,getAllLesson);

// enrollments
adminDashboardRoute.get("/all/enrolled/students",isAuthenticated,isAdmin,getEnrolledStudents)
// students
adminDashboardRoute.get("/students",isAuthenticated,isAdmin,getAllStudents)
module.exports=adminDashboardRoute;