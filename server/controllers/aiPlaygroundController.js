const axios = require("axios");

/* ================= EXPLAIN CODE ================= */
exports.explainCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-coder",
prompt: `
You are a programming teacher.

Explain the following ${language} code in a clean and well-formatted way.

Follow this format strictly:

### 1. What this code does
Explain in 2 short sentences only.

### 2. Line by line explanation
Explain each important line clearly in simple English.
Do not write long paragraphs.
Use short bullet points.

### 3. Example
Show one simple example input and output.

### 4. Final summary
Explain the logic in 2 simple sentences only.

Rules:
- Use simple English
- Do not repeat the same sentence
- Do not write very long paragraphs
- Keep the explanation clean and readable

Here is the code:

${code}
`,
      stream: false,
    });
    
    res.json({ reply: response.data.response });
    
  } catch (error) {

    res.status(500).json({ reply: "Ollama not running or error occurred" });
  }
};

/* ================= DEBUG CODE ================= */
exports.debugCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-coder",
      prompt: `Find errors in this ${language} code and fix it:\n\n${code}`,
      stream: false,
    });

    res.json({ reply: response.data.response });

  } catch (error) {
    res.status(500).json({ reply: "Ollama not running or error occurred" });
  }
};

/* ================= OPTIMIZE CODE ================= */
exports.optimizeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-coder",
      prompt: `Make this ${language} code cleaner and more efficient:\n\n${code}`,
      stream: false,
    });

    res.json({ reply: response.data.response });

  } catch (error) {
    res.status(500).json({ reply: "Ollama not running or error occurred" });
  }
};