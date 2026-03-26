const mongoose=require("mongoose");
const snippetSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.ObjectId,ref:"User"
  },
  code:{
    type:String,
    required:true
  },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  language:{
    type:String,
    required:true
  }

},{timestamps:true});

const Snippets= mongoose.model("Snippets",snippetSchema);

module.exports=Snippets