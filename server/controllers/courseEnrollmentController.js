const enrollment = require("../models/enrollment");

exports.createEnrollment=async(req,res)=>{
  try {
    const studentId=  req.session.user.id;
    const courseId=req.params.courseId;
    const existingEnrollment=await enrollment.findOne({studentId,courseId});
    if(existingEnrollment){
      return res.status(200).json({message:"Already Enrolled"});
    }
    const data= await enrollment.create({
      studentId,
      courseId,
    })
    res.status(201).json({message:"Enrolled",data:data,success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}