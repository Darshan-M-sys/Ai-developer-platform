const express = require("express");
const { explainCode, debugCode, optimizeCode } = require("../controllers/aiPlaygroundController");
const aiPlayground = express.Router();


aiPlayground.post("/explain", explainCode);
aiPlayground.post("/debug", debugCode);
aiPlayground.post("/optimize", optimizeCode);

module.exports = aiPlayground;