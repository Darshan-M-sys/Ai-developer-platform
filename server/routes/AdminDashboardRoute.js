const express=require("express");
const { usersStat } = require("../controllers/adminDashboardControllers/OverviewController");
const adminDashboardRoute=express.Router();
const upload =require("../middlewares/uploadImageMiddleware")
const isAdmin=require("../middlewares/adminMiddleware")
const isAuthenticated=require("../middlewares/authMiddleware");
const { getUsers, getSingleUser, updateUser, delateUser } = require("../controllers/adminDashboardControllers/ManageUsers");
const { createCourse, updateCourse, getSingleCourse, getAllCourses, deleteCourse } = require("../controllers/adminDashboardControllers/courseController");
const { getAllInstructors } = require("../controllers/instructorsControllers");

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

module.exports=adminDashboardRoute;