const courses = require("../../models/courses")
const User = require("../../models/User")
const bcrypt=require("bcryptjs")
exports.getAllInstructors = async (req, res) => {
  try {

    const instructor = await User.find({ role: "instructor" })

    const instructorData = []

    for (const inst of instructor) {

      const courseTaken = await courses.find({instructor: inst._id })
             
      instructorData.push({
        instructor: inst,
        course: courseTaken
      })

    }
    res.status(200).json({ data: instructorData })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.addInstructors=async(req,res)=>{
  try {
     const {name,email,password,phone}=req.body;
      const existingUser= await User.findOne({email:email});
    if(existingUser){
      return res.status(400).json({message:"User Already Exist"})
    }
    const hashPass=await bcrypt.hash(password,10) ;
    const avatar= req.file?'http://'+req.host+"/uploads/"+req.file.filename:null;
    const data= await User.create({
      name,
      email,
      phone,
      password:hashPass,
      avatar:avatar,
      role:"instructor"
    }) 
    res.status(201).json({success:true,message:"Created!",data:data})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}