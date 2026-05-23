const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  level:{
    type: String,
    required: true
  },
  skill:{
    type: String,
    required: true
  },
  goal:{
    type: String,
    required: true
  },

  phases:[
    {
      title: String,

      duration: String,

      description: String,

      topics:[
        {
          name: String,

          description: String,

          content:{
            type: String,
            default: ""
          },

          contentGenerated:{
            type: Boolean,
            default: false
          }
        }
      ]
    }
  ]

}, { timestamps:true });

const Roadmap = mongoose.model(
  "Roadmap",
  roadmapSchema
);

module.exports = Roadmap;