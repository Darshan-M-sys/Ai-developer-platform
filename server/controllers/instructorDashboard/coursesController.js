const enrollment = require("../../models/enrollment");
const courses=require("../../models/courses");
const lessons=require("../../models/lesson");


exports.createCourse=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const thumbnail=req.file? `http://${req.host}/uploads/${req.file.filename}`:null;
    const {title,duration,price,level,language,category,description,youWillLearn}=req.body;
    const data= await courses.create({
      creatorId:userId, instructor:userId,
      title,duration,price,level,language,category,description,youWillLearn,thumbnail:thumbnail
    })
    res.status(201).json({success:true,data:data,message:"Created!"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
exports.updateCourse=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const courseId=req.params.courseId;
    const existingCourse= await courses.findOne({$or:[{_id:courseId,creatorId:userId},{_id:courseId,instructor:userId}]});
    existingCourse.title= req.body.title ||  existingCourse.title;
    existingCourse.duration= req.body.duration ||  existingCourse.duration;
    existingCourse.price= req.body.price ||  existingCourse.price;
    existingCourse.level= req.body.level ||  existingCourse.level;
    existingCourse.language= req.body.language ||  existingCourse.language;
    existingCourse.category= req.body.category ||  existingCourse.category;
    existingCourse.description= req.body.description ||  existingCourse.description;
    existingCourse.youWillLearn= req.body.youWillLearn ||  existingCourse.youWillLearn;
    existingCourse.thumbnail= req.file? `http://${req.host}/uploads/${req.file.filename}`: existingCourse.thumbnail;
    await existingCourse.save();
    res.status(201).json({success:true,data:existingCourse,message:"Updated!"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}
exports.getAllCourses=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const data=[]
    const courseData= await courses.find({$or:[{creatorId:userId},{instructor:userId}]}).populate(['instructor',"creatorId"]);
     for( const c of courseData){
      const students= await enrollment.countDocuments({courseId:c._id});
      const lessonsData= await lessons.find({courseId:c._id});
      const lessonCount= await lessons.countDocuments({courseId:c._id});
      const course= await courses.findOne({_id:c._id,creatorId:userId});
       const  isCreator=course?true:false;
      data.push({course:c,studentsCount:students,lessonsCount:lessonCount,lessonData:lessonsData,isCreator:isCreator});
  
     }
      res.status(200).json({data:data})
  } catch (error) {
    console.log(error.message)
res.status(500).json({message:error.message})
  }
}

exports.getSingleCourseInfo=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const courseId=req.params.courseId;
    const data= await courses.findOne({$or:[{creatorId:userId,_id:courseId},{instructor:userId,_id:courseId}]}).populate('instructor');
    if(!data){
      res.status(404).json({message:"Course Not found"});
    }
    const dataObject=data.toObject();
    const course= await courses.findOne({_id:courseId,creatorId:userId});
  
    dataObject['lessonData']=await lessons.find({courseId:courseId})
    dataObject['isCreator']=course?true:false;
    dataObject['studentsCount']= await enrollment.countDocuments({courseId:courseId});

    res.status(200).json({courseData:data,data:dataObject})
  } catch (error) {
    res.status(500).json({message:error.message})
  }

}

exports.publishCourse=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const courseId= req.params.courseId;
    const existingCourse= await courses.findOne({$or:[{_id:courseId,creatorId:userId},{_id:courseId,instructor:userId}]});
      if(existingCourse){
           if(existingCourse.status==="published"){
            existingCourse.status="draft";
            await existingCourse.save();
           }else{
            existingCourse.status="published";
           await existingCourse.save();
           }
          }else{
            return res.status(404).json({message:'data not found'})
          }


   res.status(200).json({success:true,message:existingCourse.status})
  } catch (error) {
   res.status(500).json({message:error.message}) 
  }
}

exports.deleteCourse=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const courseId= req.params.courseId;
    await  courses.findOneAndDelete({_id:courseId,creatorId:userId});
    await lessons.deleteMany({courseId:courseId});
    await enrollment.deleteMany({courseId:courseId})
    res.status(200).json({success:true,message:"Deleted!"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}