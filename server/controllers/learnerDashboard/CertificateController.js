const Certificate = require("../../models/CertificateModel");
const progress = require("../../models/progress");
exports.getIsCreateCertificate = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const CompletedCourse= await progress.find({userId,courseCompletion:100}).populate(["courseId","userId"]);
    const CompletedCourses=[] 
    if (!CompletedCourses || CompletedCourses.courseCompletion < 100) {
      return res.json({ success: true, isCreateCertificate: false });
    }
    for (c of CompletedCourse){
       const alreadyGeneratedCertificate= await Certificate.findOne({courseId:c.courseId._id,userId:userId});
       if(alreadyGeneratedCertificate){
        return ;
       }else{
         CompletedCourses.push(c);
       }
    }
    res.json({ success: true, isCreateCertificate: true, completedCourses: CompletedCourses });
     
  } catch (error) {
    console.error("Error in getIsCreateCertificate:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.generateCertificate = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const courseId = req.params.courseId;

    // 1️⃣ Check course completion
    const completedCourse = await progress.findOne({
      userId,
      courseId,
      courseCompletion: 100,
    });

    if (!completedCourse) {
      return res.json({
        success: false,
        message: "Course not completed yet",
      });
    }

    // 2️⃣ Prevent duplicate certificate
    const existingCertificate = await Certificate.findOne({
      userId,
      courseId,
    });

    if (existingCertificate) {
      return res.json({
        success: true,
        message: "Certificate already generated",
        certificate: existingCertificate,
      });
    }

    // 3️⃣ Get uploaded files from multer
    const pdfFile = req.files["certificatePdf"][0].filename;
    const imageFile = req.files["certificateThumbnail"][0].filename;

    // 4️⃣ Create certificate id
    const certificateCount= await Certificate.countDocuments({});

const certificateId = "DEVFORGE000" + (certificateCount + 1);

    // 5️⃣ Save in DB
    const newCertificate = new Certificate({
      userId,
      courseId,
      certificateUrl:'http://'+req.host+"/uploads/"+pdfFile,
      certificateThumbnailUrl:'http://'+req.host+"/uploads/"+imageFile,
      certificateId,
    });

    await newCertificate.save();

    res.json({
      success: true,
      message: "Certificate generated successfully",
      certificate: newCertificate,
    });

  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getCertificates=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const certificatesData=await Certificate.find({userId:userId}).populate("courseId");
    res.status(200).json({data:certificatesData});
  } catch (error) {
   res.status(500).json({message:error.message}) 
  }
}