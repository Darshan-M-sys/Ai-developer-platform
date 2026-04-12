
const axios = require("axios");

/* ================= EXPLAIN CODE ================= */
exports.explainCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ reply: "Code is required" });
    }

    /* ===============================
       1. PREPARE PROMPT
    =============================== */
    const prompt = `
You are a programming teacher.

Explain the following ${language} code in a clean and well-formatted way.

Follow this format strictly:

### 1. What this code does
Explain in 2 short sentences only.

### 2. Line by line explanation
Explain each important line clearly in simple English.
Use short bullet points.

### 3. Example
Show one simple example input and output.

### 4. Final summary
Explain the logic in 2 simple sentences only.

Rules:
- Use simple English
- Do not repeat
- Keep it clean and readable

Here is the code:

${code}
`;

    /* ===============================
       2. CALL OPENROUTER (GPT)
    =============================== */
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 700
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Code Assistant",
          "Content-Type": "application/json"
        }
      }
    );

    /* ===============================
       3. EXTRACT RESPONSE
    =============================== */
    const aiReply =
      response.data.choices?.[0]?.message?.content || "No response";

    res.json({ reply: aiReply });

    /* ===============================
       🔥 OPTIONAL: OLLAMA (LOCAL AI)
       Uncomment below to use Ollama instead
    =============================== */

    /*
    const ollamaResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "deepseek-coder",
        prompt: prompt,
        stream: false
      }
    );

    res.json({ reply: ollamaResponse.data.response });
    */

  } catch (error) {
    console.log("EXPLAIN ERROR:", error.response?.data || error.message);

    res.status(500).json({
      reply: "AI error occurred"
    });
  }
};


/* ================= DEBUG CODE ================= */
exports.debugCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ reply: "Code is required" });
    }

    /* ===============================
       1. PROMPT FOR DEBUGGING
    =============================== */
    const prompt = `
You are an expert developer.

Find errors in this ${language} code and fix them.

Format:
### Errors
- List all errors clearly

### Fixed Code
\`\`\`${language}
correct code here
\`\`\`

### Explanation
Explain what was wrong in simple terms.

Code:
${code}
`;

    /* ===============================
       2. OPENROUTER CALL
    =============================== */
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 700
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Code Assistant",
          "Content-Type": "application/json"
        }
      }
    );

    const aiReply =
      response.data.choices?.[0]?.message?.content || "No response";

    res.json({ reply: aiReply });

    /* ===============================
       🔥 OLLAMA VERSION (COMMENTED)
    =============================== */

    /*
    const ollamaResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "deepseek-coder",
        prompt: prompt,
        stream: false
      }
    );

    res.json({ reply: ollamaResponse.data.response });
    */

  } catch (error) {
    console.log("DEBUG ERROR:", error.response?.data || error.message);

    res.status(500).json({
      reply: "AI error occurred"
    });
  }
};


/* ================= OPTIMIZE CODE ================= */
exports.optimizeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ reply: "Code is required" });
    }

    /* ===============================
       1. PROMPT FOR OPTIMIZATION
    =============================== */
    const prompt = `
You are a senior developer.

Improve this ${language} code.

Format:
### Improvements
- List improvements

### Optimized Code
\`\`\`${language}
optimized code here
\`\`\`

### Why it is better
Explain in simple terms.

Code:
${code}
`;

    /* ===============================
       2. OPENROUTER CALL
    =============================== */
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 700
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Code Assistant",
          "Content-Type": "application/json"
        }
      }
    );

    const aiReply =
      response.data.choices?.[0]?.message?.content || "No response";

    res.json({ reply: aiReply });

    /* ===============================
       🔥 OLLAMA VERSION (COMMENTED)
    =============================== */

    /*
    const ollamaResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "deepseek-coder",
        prompt: prompt,
        stream: false
      }
    );

    res.json({ reply: ollamaResponse.data.response });
    */

  } catch (error) {
    console.log("OPTIMIZE ERROR:", error.response?.data || error.message);

    res.status(500).json({
      reply: "AI error occurred"
    });
  }
};