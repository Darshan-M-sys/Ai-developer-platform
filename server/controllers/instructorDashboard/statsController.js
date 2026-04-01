const courses= require("../../models/courses")
exports.getStatsData=async(req,res)=>{
  try {
    const userId=req.session.user.id;
    const getCourseCount= await courses.countDocuments({$or:[{creatorId:userId},{instructor:userId}]});
    const statsData={courses:getCourseCount,students:"",enrollments:""};

    res.status(200).json({data:statsData})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}