const User = require("../../models/User");
const bcrypt=require("bcryptjs")
// get all users
exports.getUsers=async(req,res)=>{
  try {
   const usersData=await User.find();
   res.status(200).json({data:usersData}) 
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
// get single user
exports.getSingleUser=async(req,res)=>{
  try {
    const userId=req.params.userId;
    const userData= await User.findOne({_id:userId});
    res.status(200).json({data:userData});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
// update user data
exports.updateUser=async(req,res)=>{
  try {
    const userId= req.params.userId;

    const userData= await User.findOne({_id:userId});
        userData.name=req.body.name || userData.name;
        userData.email =req.body.email || userData.email;
        userData.role=req.body.role || userData.role;
        userData.phone=req.body.phone || userData.phone;
        userData.avatar=req.file?"http://"+req.host+"/uploads/"+req.file.filename:userData.avatar;
        if(req.body.password){    
      const hashPass=await bcrypt.hash(req.body.password,10)
        userData.password=hashPass|| userData.password;
        }
        await userData.save();
        res.status(201).json({success:true,message:"updated"});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}
// Delate user
exports.delateUser=async(req,res)=>{
  try {
    const userId= req.params.userId;
    await User.findOneAndDelete({_id:userId});
    res.status(200).json({success:true,message:"Deleted!"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
    
  }
}