const enrollment = require("../../models/enrollment");
const User= require("../../models/User")


exports.getAllStudents=async(req,res)=>{
  try {
    const allStudents= await User.find({role:"student"});
    res.status(200).json({data:allStudents})
  } catch (error) {
       res.status(500).json({message:error.message}) 
  }
}
