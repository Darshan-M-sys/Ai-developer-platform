const courses=require("../../models/courses");
const Certificate=require("../../models/CertificateModel")
exports.getAllCertificateIssued=async(req,res)=>{
  try {
  const certificates= await Certificate.find({}).populate(['courseId',"userId"]);
    res.status(200).json({data:certificates})
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