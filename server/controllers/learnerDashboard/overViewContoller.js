const CertificateModel = require("../../models/CertificateModel");
const enrollment = require("../../models/enrollment")

exports.getOverViewData=async(req,res)=>{
try {
  const studentId=req.session.user.id;

  const courseEnrolled=await enrollment.countDocuments({studentId});
  const Certificates=await CertificateModel.countDocuments({userId:studentId});
  const data={
    courseEnrolled:courseEnrolled,
    learningStreak:"",
    certificates:Certificates
  };
  res.status(200).json({data:data});

} catch (error) {
  console.log(error.message)
  res.status(500).json({message:error.message})
}
}