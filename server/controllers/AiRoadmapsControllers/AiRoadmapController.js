const axios = require("axios");
const Roadmap = require("../../models/roadmap");



exports.generateRoadmap = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { skill, level, goal } = req.body;

    // 🔥 CHECK EXISTING ROADMAP
    const existingRoadmap = await Roadmap.findOne({
      userId,
      skill,
      level
    });
    if (existingRoadmap) {
      return res.status(200).json({
        success: true,
        roadmap: existingRoadmap
      });
    }

const prompt = `
You are an expert developer mentor.

Generate a structured learning roadmap.

STRICT RULES:
- Output ONLY valid JSON
- No markdown, no explanation

FORMAT:
{
  "phases": [
    {
      "title": "",
      "duration": "",
      "description": "",
      "topics": [
        { "name": "", "description": "" }
      ],
      "projects": [
        { "name": "", "description": "" }
      ],
      "resources": []
    }
  ]
}

Skill: ${skill}
Level: ${level}
Goal: ${goal}
`;

    // 🤖 OPENROUTER API CALL
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Return ONLY valid JSON. No extra text."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Roadmap Generator"
        }
      }
    );

    let aiText = response.data.choices[0].message.content;

    // 🧹 CLEAN AI RESPONSE
    aiText = aiText.replace(/```json|```/g, "").trim();

    let roadmap;

    try {
      roadmap = JSON.parse(aiText);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: aiText
      });
    }

    // 💾 SAVE TO DATABASE
    const newRoadmap = new Roadmap({
      userId,
      skill,
      level,
      goal,
      phases: roadmap.phases
    });

    await newRoadmap.save();

    return res.status(200).json({
      success: true,
      roadmap: newRoadmap
    });

  } catch (error) {
    console.error("OpenRouter Error:", error?.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate roadmap"
    });
  }
};

exports.getAllRoadmaps = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const roadmaps = await Roadmap.find({ userId });

    return res.status(200).json({ 
      success: true,
      roadmaps
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmaps"
    });
  }
};



exports.deleteRoadmap = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { roadmapId } = req.params;
    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found"
      });
    }

    await Roadmap.deleteOne({ _id: roadmapId });

    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete roadmap"
    });
  }
};
