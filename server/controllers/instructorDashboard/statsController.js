const courses= require("../../models/courses");
const enrollment = require("../../models/enrollment");
const User= require("../../models/User")

exports.getStatsData=async(req,res)=>{
  try {
    const userId=req.session.user.id;
    const getCourseCount= await courses.countDocuments({$or:[{creatorId:userId},{instructor:userId}]});
  
    const totalStudents= await User.countDocuments({role:"student"});
    const courseIds=await courses.find({$or:[{creatorId:userId},{instructor:userId}]},{_id:1})
    const ids=courseIds.map((course=>course._id)) 
const totalEnrollments = await enrollment.countDocuments({
  courseId: { $in: ids }
});
  const statsData={courses:getCourseCount,students:totalStudents,enrollments:totalEnrollments};
    res.status(200).json({data:statsData})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}