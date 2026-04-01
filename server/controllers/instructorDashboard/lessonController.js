const lessons= require('../../models/lesson')

exports.createLesson=async(req,res)=>{
  try {
    const creator= req.session.user.id;
    const courseId= req.params.courseId;
     const {title,subDescription,duration,description,percentage}= req.body;
     if(!req.file){
      return res.status(400).json({message:"Video File Is Required!"})
     }
     const videoUrl=req.file? "http://"+req.host+"/uploads/"+req.file.filename : null;
     const data=  await lessons.create({
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
    const existingLesson= await lessons.findOne({_id:lessonId});
    
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
    await lessons.findByIdAndDelete({_id:lessonId})
    res.status(200).json({message:"Deleted!",success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.getLessons=async(req,res)=>{
  try {
    const courseId= req.params.courseId;
    const data= await lessons.find({courseId:courseId})
    res.status(200).json({data:data})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.getSingleLesson=async(req,res)=>{
  try {
    const {courseId,lessonId}= req.params;
    const data= await lessons.findOne({courseId:courseId,_id:lessonId})
    res.status(200).json({data:data})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}