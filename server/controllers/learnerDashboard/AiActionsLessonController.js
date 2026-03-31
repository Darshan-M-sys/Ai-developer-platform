const axios = require("axios");
const LessonExplainAi = require("../../models/LessonExplainAi");
exports.explainLesson = async (req, res) => {
  try {
      const lessonId=req.params.lessonId;
      const userId=req.session.user.id;
      const courseId=req.params.courseId;
      const question=req.body.question;
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "deepseek-coder",
        prompt: `As an expert tutor, explain the following concept in simple terms:\n\nCourse ID: ${courseId}\nLesson ID: ${lessonId}\nUser Question: ${question}`,   
        stream: false,
      });
     if(!response.data.response){
      return res.status(500).json({ success: false, message: "Failed to get explanation from AI" });
     }
      const explanation=response.data.response;
    const existingEntry= await LessonExplainAi.findOne({ courseId, lessonId, userId, question });
    if(existingEntry){
      return res.json({ success: true, data: existingEntry.explanation });
    }

    const newEntry=new LessonExplainAi({
        courseId,
        lessonId,
        userId,
        question,
        explanation
      })
      await newEntry.save();
  
     res.json({ success: true, data: explanation });

  } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: "Server Error" });
  }}
