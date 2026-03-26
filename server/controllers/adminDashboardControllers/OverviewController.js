const courses = require("../../models/courses");
const User= require("../../models/User")
exports.usersStat=async(req,res)=>{
  try {
    const data={totalUsers:0,totalStudents:0,totalInstructors:0,totalCourses:0}
    data.totalUsers= await User.countDocuments({});
    data.totalInstructors=await User.countDocuments({role:"instructor"});
    data.totalStudents=await User.countDocuments({role:"student"});
    data.totalCourses =await courses.countDocuments();
  
    res.status(200).json({data:data})
  } catch (error) {
     res.status(500).json({message:error.message})
  }
}