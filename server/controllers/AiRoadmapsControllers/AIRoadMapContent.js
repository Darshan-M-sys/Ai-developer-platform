const axios = require("axios");
const Roadmap = require("../../models/roadmap");

exports.generateTopicContent = async (req, res) => {

  try {

    const {
      roadmapId,
      topicId
    } = req.body;

    const roadmap = await Roadmap.findById(
      roadmapId
    );

    if(!roadmap){

      return res.status(404).json({
        success: false,
        message: "Roadmap not found"
      });

    }

    let selectedTopic = null;

    roadmap.phases.forEach((phase) => {

      phase.topics.forEach((topic) => {

        if(topic._id.toString() === topicId){

          selectedTopic = topic;

        }

      });

    });

    if(!selectedTopic){

      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });

    }

    // 🔥 RETURN OLD CONTENT IF ALREADY GENERATED

    if(selectedTopic.contentGenerated){

      return res.status(200).json({
        success: true,
        content: selectedTopic.content
      });

    }

    // 🤖 AI PROMPT

    const prompt = `
Generate detailed beginner-friendly learning content.

Topic:
${selectedTopic.name}

Description:
${selectedTopic.description}

Include:
- Introduction
- Core concepts
- Examples
- Real-world usage
- Important points

Return plain text only.
`;

    // 🤖 OPENROUTER API CALL

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiContent =
      response.data.choices[0].message.content;

    // 💾 SAVE GENERATED CONTENT

    selectedTopic.content = aiContent;

    selectedTopic.contentGenerated = true;

    await roadmap.save();

    return res.status(200).json({
      success: true,
      content: aiContent
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate content"
    });

  }

};