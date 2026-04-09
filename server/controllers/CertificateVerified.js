const Certificate = require("../models/CertificateModel");

exports.verifyCertificates=async(req,res)=>{
  try {
    const {certificateId}=req.body;
    const certificateData=await Certificate.findOne({certificateId:certificateId}).populate(['userId',"courseId"]);
    if(!certificateData){
      return res.status(200).json({message:"invalid"})
    }
    
    res.status(200).json({message:"Valid",success:true,data:certificateData});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}