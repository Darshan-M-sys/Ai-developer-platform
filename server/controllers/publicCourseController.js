const courses=require("../models/courses");
const enrollment = require("../models/enrollment");
const lesson =require("../models/lesson")
exports.getAllCourses=async(req,res)=>{
  try {
    const data=await courses.find({}).populate("instructor");
    res.status(200).json({data:data})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
exports.getSingleCourse=async(req,res)=>{
  try {
    const courseId=req.params.courseId;
    const data=await courses.findOne({_id:courseId}).populate("instructor");
    const lessonData=await lesson.find({courseId:courseId});
    const studentCount= await enrollment.countDocuments({courseId:courseId});
    const dataObject=data.toObject();
    dataObject['studentCount']=studentCount;
    dataObject['lessonData']=lessonData;
    res.status(200).json({data:dataObject});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}