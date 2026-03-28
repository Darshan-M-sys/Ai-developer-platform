const express= require("express");
const isAuthenticated=require("../middlewares/authMiddleware");
const isStudent = require("../middlewares/Student");
const { createEnrollment } = require("../controllers/courseEnrollmentController");
const enrollmentRouter=express.Router();
enrollmentRouter.post('/enrollment/:courseId',isAuthenticated,isStudent,createEnrollment);
module.exports=enrollmentRouter