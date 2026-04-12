import React from "react";
import ReactMarkdown from "react-markdown";
import LoadingChatAnimate from "../LoadingChatAnimate";

const AiActionsInLessonPage = ({
  setActiveAiToolTab,
  aiExplainLoading,
  aiExplanationNotesLoading,
  handleAiExplanation,
  handleAiExplanationNotes,
  explanationData,     // 👈 AI explanation
  notesData,           // 👈 AI notes
  activeAiToolTab      // 👈 which tab is active
}) => {
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
          disabled={aiExplainLoading || aiExplanationNotesLoading}
          onClick={() => {
            setActiveAiToolTab("explain");
            handleAiExplanation();
          }}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <span>🤖</span>
          {aiExplainLoading ? <LoadingChatAnimate /> : "Explain this lesson with AI"}
        </button>

        {/* AI Notes */}
        <button
          disabled={aiExplanationNotesLoading || aiExplainLoading}
          onClick={() => {
            setActiveAiToolTab("notes");
            handleAiExplanationNotes();
          }}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
        >
          <span>📝</span>
          {aiExplanationNotesLoading ? <LoadingChatAnimate /> : "Generate Notes"}
        </button>
      </div>

      {/* ===============================
          OUTPUT SECTION (ReactMarkdown)
      =============================== */}

      <div className="mt-6 bg-gray-50 p-4 rounded-lg min-h-[150px]">

        {/* Explain Output */}
        {activeAiToolTab === "explain" && (
          <>
            {aiExplainLoading ? (
              <LoadingChatAnimate />
            ) : explanationData ? (
              <div className="prose max-w-none">
                <ReactMarkdown>{explanationData}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Click "Explain" to see AI explanation
              </p>
            )}
          </>
        )}

        {/* Notes Output */}
        {activeAiToolTab === "notes" && (
          <>
            {aiExplanationNotesLoading ? (
              <LoadingChatAnimate />
            ) : notesData ? (
              <div className="prose max-w-none">
                <ReactMarkdown>{notesData}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Click "Generate Notes" to see AI notes
              </p>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default AiActionsInLessonPage;