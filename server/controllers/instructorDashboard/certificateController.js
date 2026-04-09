const courses=require("../../models/courses");
const Certificate=require("../../models/CertificateModel")
exports.getAllCertificateIssued=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const allMyCourses=await courses.find({$or:[{creatorId:userId},{instructor:userId}]});
 
    const data=[];
    for( c of allMyCourses){
      const certificates= await Certificate.find({courseId:c._id}).populate(['courseId',"userId"]);
      data.push(certificates)
    }

    res.status(200).json({data:data})
  } catch (error) {
    console.log(error.message)
   res.status(500).json({message:error.message}) 
  }
}

exports.deleteCertificate=async(req,res)=>{
  try {
    const certificateId= req.params.certificateId;
    await Certificate.findOneAndDelete({_id:certificateId});
    res.status(200).json({message:"deleted",success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}