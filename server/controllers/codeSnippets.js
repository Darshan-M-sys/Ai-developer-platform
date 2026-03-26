const Snippets = require("../models/snippets");

exports.saveSnippets=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const {code,language,title}=req.body;
    if(!code || !language || !title){
      return res.status(400).json({msg:"Credentials Required!"})
    }
    await  Snippets.create({userId:userId,language:language,code:code,title:title});
     res.status(201).json({msg:"saved",success:true})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

exports.getAllSnippets=async(req,res)=>{
  try {
    const userId=req.session.user.id;
    const data= await Snippets.find({userId:userId});
    res.status(200).json({data:data})
  } catch (error) {
   res.status(500).json({msg:error.message}) 
  }
}

exports.getSingleSnippets=async(req,res)=>{
  try {
    const snippetsId= req.params.snippetsId;
    const userId=req.session.user.id;
    const data= await Snippets.findOne({userId:userId,_id:snippetsId});
    res.status(200).json({data:data})
  } catch (error) {
    console.log(error.message)
   res.status(500).json({msg:error.message}) 
  }
}

exports.updateSnippets=async(req,res)=>{
  try {
    const snippetsId= req.params.snippetsId;
    const userId=req.session.user.id;
    const code =req.body.code;
    const data= await Snippets.findOne({userId:userId,_id:snippetsId});
    if(data){
            data.code= code || data.code;
          await data.save();
        }
    res.status(200).json({success:true,msg:"updated"})
  } catch (error) {
    console.log(error.message)
   res.status(500).json({msg:error.message}) 
  }
}
exports.deleteSnippets=async(req,res)=>{
  try {
    const snippetsId= req.params.snippetsId;
    const userId=req.session.user.id;
    await Snippets.findByIdAndDelete({userId:userId,_id:snippetsId});
    res.status(200).json({success:true})
  } catch (error) {
    console.log(error.message)
   res.status(500).json({msg:error.message}) 
  }
}