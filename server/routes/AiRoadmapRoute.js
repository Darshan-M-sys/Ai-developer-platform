const express = require("express");
const {generateRoadmap, getAllRoadmaps, deleteRoadmap}= require("../controllers/AiRoadmapsControllers/AiRoadmapController");
const { generateTopicContent } = require("../controllers/AiRoadmapsControllers/AIRoadMapContent");


const roadMapGenerator = express.Router();
roadMapGenerator.post("/generate-roadmap", generateRoadmap);
roadMapGenerator.get("/roadmaps", getAllRoadmaps);
// ADD THIS ROUTE

roadMapGenerator.post(
  "/generate-topic-content",
  generateTopicContent
);
roadMapGenerator.delete("/delete/:roadmapId",deleteRoadmap);
module.exports = roadMapGenerator;