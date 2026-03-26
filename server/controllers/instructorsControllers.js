const User = require("../models/User")
exports.getAllInstructors=async(req,res)=>{
  try {
    const instructorData= await User.find({role:"instructor"})
    res.status(200).json({data:instructorData})
  } catch (error) {
   res.status(500).json({message:error.message}) 

  }
}