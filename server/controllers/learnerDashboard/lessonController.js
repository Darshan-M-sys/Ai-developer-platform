const lesson=require("../../models/lesson");
exports.getAllLessons=async(req,res)=>{
  try {
    const courseId=req.params.courseId;
    const lessonsData= await lesson.find({courseId:courseId}).populate("courseId");
    res.status(200).json({success:true,data:lessonsData})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message})
  } 
}

exports.getLessonById=async(req,res)=>{
  try {
    const lessonId=req.params.lessonId;
    const courseId=req.params.courseId;
    const lessonData= await lesson.findOne({_id:lessonId , courseId:courseId}).populate("courseId");

    res.status(200).json({success:true,data:lessonData})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message})
  } 
}

