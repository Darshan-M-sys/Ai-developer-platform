// models/roadmap.js

const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  content: {
    type: String,
    default: ""
  }
});

const phaseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  duration: {
    type: String,
    default: ""
  },

  description: {
    type: String,
    default: ""
  },

  topics: [topicSchema]

});

const roadmapSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  skill: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  },

  goal: {
    type: String,
    default: ""
  },

  phases: [phaseSchema]

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Roadmap",
  roadmapSchema
);