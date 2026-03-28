const express= require("express");
const { getAllCourses, getSingleCourse } = require("../controllers/publicCourseController");
const publicCourseRoute=express.Router();
publicCourseRoute.get("/course",getAllCourses);
publicCourseRoute.get("/course/:courseId",getSingleCourse);
module.exports=publicCourseRoute;