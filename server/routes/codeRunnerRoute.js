const express = require("express");
const { runCode } = require("../controllers/codeRunner");
const codeRunner = express.Router();

codeRunner.post("/run", runCode);

module.exports = codeRunner;