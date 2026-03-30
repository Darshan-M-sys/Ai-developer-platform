const enrollment = require("../../models/enrollment");
const User= require("../../models/User")
const progress = require("../../models/progress");
const lesson= require("../../models/lesson")
exports.getEnrolledCourses=async(req,res)=>{
  try {
   const dataObject=[];  
    const studentId=req.session.user.id;
    const enrollmentCourses=await enrollment.find({studentId}).populate(['studentId',"courseId"]);
   
     for (c of enrollmentCourses){
      const progressData= await progress.findOne({userId:studentId,courseId:c.courseId._id});
       const instructorData= await User.findOne({_id:c.courseId.instructor});
       const lessonCount=await lesson.countDocuments({courseId:c.courseId._id}); 
       const lessonData=await lesson.find({courseId:c.courseId._id});
       dataObject.push({enrollmentCourses:c,instructorData:instructorData,lessonCount:lessonCount,progressData:progressData,lessonData:lessonData})
    }
  
    res.status(200).json({data:dataObject});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.getEnrolledSingleCourse=async(req,res)=>{
  try {
    const enrollmentId=req.params.enrollmentId;
    const enrollmentCourse=await enrollment.findOne({_id:enrollmentId}).populate(['studentId',"courseId"]);
  
    const objectData=enrollmentCourse.toObject();
    const instructorData= await User.findOne({_id:enrollmentCourse.courseId.instructor});
    const lessonCount=await lesson.countDocuments({courseId:enrollmentCourse.courseId._id}); 
    objectData['instructorData']=instructorData;
    objectData['lessonCount']=lessonCount;
    res.status(200).json({data:objectData});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message})
  }
}

exports.cancelEnrollment=async(req,res)=>{
  try {
      const enrollmentId=req.params.enrollmentId;
      const studentId=req.session.user.id;

      const deletedEnrollment=await enrollment.findOneAndDelete({studentId,_id:enrollmentId});
 
      await progress.findOneAndDelete({userId:studentId,courseId:deletedEnrollment.courseId})
   res.status(200).json({message:"Deleted!",success:true})
  } catch (error) {
   res.status(500).json({message:error.message}) 
  }

}