import React, { useState } from "react";

const ExplainWithAi = ({ lessonTitle }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    setShow(true);

    // 🔥 Fake AI (replace with real API later)
    setTimeout(() => {
      const aiText = `🤖 "${lessonTitle}" is an important concept. It focuses on understanding the fundamentals and applying them in real-world scenarios. Try building small examples to master it.`;

      setResponse(aiText);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mt-2">

      {/* Button */}
      <button
        onClick={handleExplain}
        className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
      >
        {loading ? "Thinking..." : "Explain with AI"}
      </button>

      {/* Response Box */}
      {show && (
        <div className="mt-2 p-3 bg-gray-100 rounded text-sm text-gray-700">
          {loading ? "🤖 Generating explanation..." : response}
        </div>
      )}

    </div>
  );
};

export default ExplainWithAi;