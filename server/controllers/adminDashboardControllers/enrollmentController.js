const enrollment = require("../../models/enrollment");
const User= require("../../models/User")
const progress=require("../../models/progress")
exports.getEnrolledStudents=async(req,res)=>{
  try {
    const  userId=await User.find({role:"student"},{_id:1});
    const  ids= userId.map((user=>user._id));
    const data=[];
    const enrolledData=await enrollment.find({studentId:{$in:ids}})
    for( enro of enrolledData){
    const progressData=await progress.findOne({courseId:enro.courseId,userId:enro.studentId}).populate(['courseId',"userId"]);
      data.push(progressData)
    }
   res.status(200).json({data:data});
 
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}

exports.enrollmentDelete=async(req,res)=>{
  try {
    const enrollmentId= req.params.enrollmentId;
      await enrollment.findOneAndDelete({_id:enrollmentId})
    res.status(200).json({message:"Deleted!",success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}