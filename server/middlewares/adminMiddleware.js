const isAdmin=(req,res,next)=>{
if(req.session.user.role==="admin"){
  next();
}
else{
  return res.status(401).json({message:"Access Denied!"})
}
}

module.exports=isAdmin;