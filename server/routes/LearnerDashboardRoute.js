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

module.exports=learnerDashboardRoute;