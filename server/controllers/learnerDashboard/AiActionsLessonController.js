const axios = require("axios");
const LessonExplainAi = require("../../models/LessonExplainAi");
const courses = require("../../models/courses");
const lessonNotes = require("../../models/AiLessonNotes");

/* ================= EXPLAIN LESSON ================= */
exports.explainLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const userId = req.session.user.id;
    const courseId = req.params.courseId;
    const question = req.body.question;

    /* ===============================
       1. GET COURSE DATA
    =============================== */
    const courseData = await courses.findOne({ _id: courseId });

    /* ===============================
       2. CHECK CACHE (DB)
    =============================== */
    const existingEntry = await LessonExplainAi.findOne({
      courseId,
      lessonId,
      userId
    });

    if (existingEntry) {
      return res.json({
        success: true,
        data: existingEntry.explanation
      });
    }

    /* ===============================
       3. PREPARE PROMPT
    =============================== */
    const prompt = `
You are an expert tutor.

Explain the concept in very simple terms so that a beginner can understand easily.

Course:
${courseData?.title}

User Question:
${question}

Instructions:
- Use simple language
- Break into sections
- Use bullet points
- Add examples
- Use Markdown formatting
- Highlight keywords using **bold**

Output Format:
Return ONLY valid Markdown (ReactMarkdown compatible).
No HTML. No extra text.
`;

    /* ===============================
       4. CALL OPENROUTER (GPT)
    =============================== */
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 800
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Learning Platform",
          "Content-Type": "application/json"
        }
      }
    );

    /* ===============================
       5. EXTRACT RESPONSE
    =============================== */
    const explanation =
      response.data.choices?.[0]?.message?.content || null;

    if (!explanation) {
      return res.status(500).json({
        success: false,
        message: "Failed to get explanation from AI"
      });
    }

    /* ===============================
       6. SAVE TO DB (CACHE)
    =============================== */
    const newEntry = new LessonExplainAi({
      courseId,
      lessonId,
      userId,
      explanation
    });

    await newEntry.save();

    res.json({
      success: true,
      data: explanation
    });

    /* ===============================
       🔥 OPTIONAL: OLLAMA VERSION
       Uncomment below to use local AI
    =============================== */

    /*
    const ollamaResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi3:mini",
        prompt: prompt,
        stream: false
      }
    );

    const explanation = ollamaResponse.data.response;

    res.json({ success: true, data: explanation });
    */

  } catch (error) {
    console.log("EXPLAIN LESSON ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


/* ================= GENERATE LESSON NOTES ================= */
exports.generateLessonNotes = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const userId = req.session.user.id;
    const courseId = req.params.courseId;
    const question = req.body.question;

    /* ===============================
       1. GET COURSE DATA
    =============================== */
    const courseData = await courses.findOne({ _id: courseId });

    /* ===============================
       2. CHECK CACHE
    =============================== */
    const existingEntry = await lessonNotes.findOne({
      courseId,
      lessonId,
      userId
    });

    if (existingEntry) {
      return res.json({
        success: true,
        data: existingEntry.explanationNotes
      });
    }

    /* ===============================
       3. PREPARE PROMPT
    =============================== */
    const prompt = `
You are an expert tutor.

Create structured NOTES for quick revision.

Course:
${courseData?.title}

Topic:
${question}

Instructions:
- Use headings and subheadings
- Use bullet points
- Keep sentences short
- Highlight keywords using **bold**
- Add examples
- Add final summary

Output:
Return ONLY valid Markdown.
No HTML. No extra text.
`;

    /* ===============================
       4. CALL OPENROUTER
    =============================== */
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 800
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Learning Platform",
          "Content-Type": "application/json"
        }
      }
    );

    /* ===============================
       5. EXTRACT RESPONSE
    =============================== */
    const notes =
      response.data.choices?.[0]?.message?.content || null;

    if (!notes) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate notes"
      });
    }

    /* ===============================
       6. SAVE TO DB
    =============================== */
    const newEntry = new lessonNotes({
      courseId,
      lessonId,
      userId,
      explanationNotes: notes
    });

    await newEntry.save();

    res.json({
      success: true,
      data: notes
    });

    /* ===============================
       🔥 OPTIONAL: OLLAMA VERSION
    =============================== */

    /*
    const ollamaResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi3:mini",
        prompt: prompt,
        stream: false
      }
    );

    const notes = ollamaResponse.data.response;

    res.json({ success: true, data: notes });
    */

  } catch (error) {
    console.log("NOTES ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};