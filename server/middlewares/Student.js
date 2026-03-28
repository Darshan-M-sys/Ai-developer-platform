const isStudent=(req,res,next)=>{
  if(req.session.user.role==="student"){
    next();
  }else{
    console.log(req.session.user)
    res.status(401).json({message:"Access Denied!"});
  }  
}
module.exports=isStudent;