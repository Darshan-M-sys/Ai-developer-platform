const LessonQuizAi = require("../../models/AiQuizLesson");
const axios = require("axios");

// function to clean AI response
function cleanAIResponse(text) {
  try {
    // remove markdown blocks
    text = text.replace(/```json/g, "").replace(/```/g, "");

    // remove comments like #something
    text = text.replace(/#.*$/gm, "");

    // remove extra spaces
    text = text.trim();

    // extract only JSON part
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) return null;

    const jsonString = text.substring(start, end + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

exports.createQuiz = async (req, res) => {
  try {
    const { lessonId, courseId } = req.params;
    const userId = req.session.user.id;
    const lessonData = req.body.lessonData;

    // check if quiz already exists
    const existingQuiz = await LessonQuizAi.findOne({
      lessonId,
      courseId,
      userId,
    });

    if (existingQuiz) {
      return res.json({
        success: true,
        data: existingQuiz.quizData,
      });
    }

    // AI request
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-coder",
      prompt: `
You are a JSON generator.

Return ONLY JSON.
Do not write explanation.
Do not write comments.
Do not write markdown.

Format:

{
  "quiz": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "answer": 0
    }
  ]
}

Create 5 quiz questions from this lesson:

${JSON.stringify(lessonData)}
`,
      stream: false,
    });

    const rawQuiz = response.data.response;

    if (!rawQuiz) {
      return res.status(400).json({
        success: false,
        message: "AI did not return data",
      });
    }

    // clean and parse
    const quizData = cleanAIResponse(rawQuiz);

    if (!quizData) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: rawQuiz,
      });
    }

    // save quiz
    const newQuiz = new LessonQuizAi({
      lessonId,
      courseId,
      userId,
      quizData,
    });

    await newQuiz.save();

    res.json({
      success: true,
      data: quizData,
    });

  } catch (error) {
    console.log("AI Quiz Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};