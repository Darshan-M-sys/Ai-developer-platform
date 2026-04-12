const mongose = require("mongoose");

const roadmapSchema = new mongose.Schema({
  userId:{ type: mongose.Schema.Types.ObjectId, ref: "User", required: true },
  skill: { type: String, required: true },
  level: { type: String, required: true },
  goal: { type: String, required: true },
  phases:{ type: Array, required: true },
}, {timestamps:true});

const Roadmap = mongose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;