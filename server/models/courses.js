const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  creatorId:{
type: mongoose.Schema.Types.ObjectId,
 required:true
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  instructor: {
type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  price: {
    type: Number,
    default: 0,
  },
students:{
  type:Number,
},
  category: {
    type: String,
  },
  duration:{
    type:String
  },
  youWillLearn:{
    type:String
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },

  thumbnail: {
    type: String,
  },

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);