const isAuthenticated=(req,res,next)=>{
  if(req.session.user && req.session ){
    next();
  }else{
    return res.status(401).json({msg:"auAuthenticated!"})
  }
}

module.exports=isAuthenticated;