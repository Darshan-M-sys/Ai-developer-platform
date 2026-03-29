import React from "react";

const AiActionsInLessonPage = ({ setActiveAiToolTab }) => {
  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm">

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold mb-4">
        AI Learning Tools
      </h3>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Explain Lesson */}
        <button
          onClick={() => setActiveAiToolTab("explain")}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <span>🤖</span>
          Explain this lesson with AI
        </button>

        {/* AI Quiz */}
        <button
          onClick={() => setActiveAiToolTab("quiz")}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          <span>🧠</span>
          Quiz with AI
        </button>

        {/* AI Notes */}
        <button
          onClick={() => setActiveAiToolTab("notes")}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
          <span>📝</span>
          Generate Notes
        </button>

      </div>
    </div>
  );
};

export default AiActionsInLessonPage;