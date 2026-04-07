const courses = require("../../models/courses");
const enrollment = require("../../models/enrollment");

exports.createCourse=async(req,res)=>{
  try {
    const creatorId=req.session.user.id;
    const {
      title,
      description,
      instructor,
      price,
      category,
      level,
      duration,
      youWillLearn,
      language,
    }=req.body;
   const  thumbnail=req.file?"http://"+req.host+"/uploads/"+req.file.filename:null;
   const data = await courses.create({
    creatorId,
       title,
      description,
      instructor,
      price,
      category,
      level,
      duration,
      youWillLearn,
      language,
      thumbnail:thumbnail
   });
   res.status(200).json({message:"Created" ,data:data,success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.updateCourse=async(req,res)=>{
  try {
    const creatorId=req.session.user.id;
    const courseId=req.params.courseId;
    const courseData= await courses.findOne({_id:courseId,creatorId:creatorId});
          courseData.title=req.body.title || courseData.title;
          courseData.description=req.body.description || courseData.description;
          courseData.instructor=!req.body.instructor?courseData.instructor:req.body.instructor;
          courseData.title=req.body.title || courseData.title;
          courseData.price=req.body.price || courseData.price;
          courseData.language=req.body.language || courseData.language;
          courseData.level=req.body.level || courseData.level;
          courseData.category=req.body.category || courseData.category;
          courseData.youWillLearn=req.body.youWillLearn || courseData.youWillLearn;
          courseData.duration=req.body.duration || courseData.duration;
          courseData.thumbnail=req.file?"http://"+req.host+"/uploads/"+req.file.filename: courseData.thumbnail;
          await courseData.save();
  
   res.status(200).json({message:"updated!" ,data:courseData,success:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}

exports.getAllCourses=async(req,res)=>{
  try {
    const data=[];
    const coursesData= await courses.find({}).populate("instructor");
    
    for(c of coursesData){
     const studentCount= await enrollment.countDocuments({courseId:c._id});
       data.push({courseData:c,studentCount:studentCount});
    }
   
    res.status(200).json({data:data});
   
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
exports.getSingleCourse=async(req,res)=>{
  try {
    const courseId=req.params.courseId;
    const coursesData= await courses.findOne({_id:courseId}).populate("instructor");
    const students= await enrollment.countDocuments({courseId:courseId});
    const dataObject=coursesData.toObject();
    dataObject['studentsCount']=students;
    res.status(200).json({data:dataObject});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.deleteCourse=async(req,res)=>{
  try {
    const courseId= req.params.courseId;
   await courses.findOneAndDelete({_id:courseId});
    res.status(200).json({success:true,message:"Deleted!"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}