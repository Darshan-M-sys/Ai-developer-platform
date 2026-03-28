const enrollment = require("../../models/enrollment")

exports.getOverViewData=async(req,res)=>{
try {
  const studentId=req.session.user.id;

  const courseEnrolled=await enrollment.countDocuments({studentId});
  const data={
    courseEnrolled:courseEnrolled,
    learningStreak:"",
    problemSolved:""
  };
  res.status(200).json({data:data});
} catch (error) {
  res.status(500).json({message:error.message})
}
}