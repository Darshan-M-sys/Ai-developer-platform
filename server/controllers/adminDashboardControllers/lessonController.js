const courses = require("../../models/courses");
const lesson = require("../../models/lesson");

exports.createLesson=async(req,res)=>{
  try {
    const creator= req.session.user.id;
    const courseId= req.params.courseId;
     const {title,subDescription,duration,description,percentage}= req.body;
     if(!req.file){
      return res.status(400).json({message:"Video File Is Required!"})
     }
     const videoUrl=req.file? "http://"+req.host+"/uploads/"+req.file.filename : null;
     const data=  await lesson.create({
      creatorId:creator,
      courseId:courseId,
      title,
      percentage,
      subDescription,
      description,
      duration,
      videoUrl:videoUrl
     })
     res.status(200).json({success:true,data:data,message:"Lesson Created"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

exports.updateLesson=async(req,res)=>{
  try {
    const  lessonId= req.params.lessonId;
    const existingLesson= await lesson.findOne({_id:lessonId});
    
     existingLesson.title= req.body.title || existingLesson. title;
     existingLesson.subDescription= req.body.subDescription || existingLesson. subDescription;
     existingLesson.description= req.body.description || existingLesson. description;
     existingLesson.percentage= req.body.percentage || existingLesson. percentage;
     existingLesson.duration= req.body.duration || existingLesson. duration;
     existingLesson.videoUrl= req.file? "http://"+req.host+"/uploads/"+req.file.filename: existingLesson.videoUrl;
   
     await existingLesson.save()
     res.status(201).json({success:true,data:existingLesson,message:"Lesson Updated"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}


exports.deleteLesson=async(req,res)=>{
  try {
    const lessonId=req.params.lessonId;
    await lesson.findByIdAndDelete({_id:lessonId})
    res.status(200).json({message:"Deleted!",success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.getSingleLesson= async(req,res)=>{
  try {
   const lessonId= req.params.lessonId;

   let lessonData=  await lesson.findOne({_id:lessonId}).populate("courseId");

    const instructor= await courses.findOne({instructor:lessonData.courseId?.instructor},{instructor:1}).populate('instructor')
     const lessonObject= lessonData.toObject();
    lessonObject["instructor"]=instructor
   res.status(200).json({data:lessonObject}) 
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.getAllLesson= async(req,res)=>{
  try {
   const courseId= req.params.courseId;
   const lessonData=  await lesson.find({courseId:courseId}).populate("courseId");
  
   res.status(200).json({data:lessonData}) 
  } catch (error) {
        console.log(error.message)
    res.status(500).json({message:error.message})

  }
}