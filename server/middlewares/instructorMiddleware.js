const isInstructor=(req,res,next)=>{
  if(req.session.user.role==="instructor"){
    next();
  }else{
    return res.status(401).json({message:"UnAuthentication"});
  }
}

module.exports=isInstructor;