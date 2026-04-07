const enrollment = require("../../models/enrollment");
const User= require("../../models/User")
exports.getEnrolledStudents=async(req,res)=>{
  try {
    const  userId=await User.find({role:"student"},{_id:1});
    const  ids= userId.map((user=>user._id));
    const enrolledData=await enrollment.find({studentId:{$in:ids}}).populate(['courseId','studentId']);
  console.log(enrolledData);
   res.status(200).json({data:enrolledData});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

