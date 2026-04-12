const express = require("express");
const {generateRoadmap, getAllRoadmaps, deleteRoadmap}= require("../controllers/AiRoadmapsControllers/AiRoadmapController");


const roadMapGenerator = express.Router();
roadMapGenerator.post("/generate-roadmap", generateRoadmap);
roadMapGenerator.get("/roadmaps", getAllRoadmaps);
roadMapGenerator.delete("/delete/:roadmapId",deleteRoadmap);
module.exports = roadMapGenerator;