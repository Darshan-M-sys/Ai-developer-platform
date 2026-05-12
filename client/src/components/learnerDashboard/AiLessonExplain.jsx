import React from "react";
import ReactMarkdown from "react-markdown";

const AiLessonExplain = ({ aiExplanation }) => {



  return (
    <div className="bg-white p-2 md:p-6 rounded-xl shadow-sm ">

      <h2 className="text-xl font-bold">AI Lesson Explanation</h2>

      <div className="prose max-w-full">
        <ReactMarkdown>{aiExplanation}</ReactMarkdown>
      </div>

    </div>
  );
};

export default AiLessonExplain;