import React, { useState } from "react";

const AiTips = () => {
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState("");

  const getAiTips = async () => {
    setLoading(true);

    try {
      // 👉 later connect to backend API
      // const res = await fetch("/api/ai-tips", { method: "POST" });
      // const data = await res.json();

      // Mock response (for now)
      setTimeout(() => {
        setTips(
          `💡 Hint: import React, { useState } from "react";

const AiTips = () => {
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState("");

  const getAiTips = async () => {
    setLoading(true);

    try {
      // 👉 later connect to backend API
      // const res = await fetch("/api/ai-tips", { method: "POST" });
      // const data = await res.json();

      // Mock response (for now)
      setTimeout(() => {
        setTips(
          "💡 Hint: Try using a HashMap to store values and check complement (target - num)."
        );
        setLoading(false);
      }, 1500);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 h-full flex flex-col">

      {/* Header */}
      <h2 className="text-lg font-bold mb-3">🤖 AI Tips</h2>

      {/* Button */}
      <button
        onClick={getAiTips}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4 hover:bg-purple-700"
      >
        {loading ? "Generating..." : "Get Hint"}
      </button>

      {/* Output */}
      <div className="flex-1 bg-gray-100 p-3 rounded overflow-y-auto">
        {loading ? (
          <p className="text-gray-500">AI is thinking...</p>
        ) : tips ? (
          <p>{tips}</p>
        ) : (
          <p className="text-gray-400">Click "Get Hint" to see AI suggestions</p>
        )}
      </div>

    </div>
  );
};

export default AiTips;}`
        );
        setLoading(false);
      }, 1500);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4  max-w-[100vh] overflow-y-auto flex flex-col">

      {/* Header */}
      <h2 className="text-lg font-bold mb-3">🤖 AI Tips</h2>

      {/* Button */}
      <button
        onClick={getAiTips}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4 hover:bg-purple-700"
      >
        {loading ? "Generating..." : "Get Hint"}
      </button>

      {/* Output */}
      <div className="flex-1 bg-gray-100 p-3 rounded overflow-y-auto">
        {loading ? (
          <p className="text-gray-500">AI is thinking...</p>
        ) : tips ? (
          <pre>{tips}</pre>
        ) : (
          <p className="text-gray-400">Click "Get Hint" to see AI suggestions</p>
        )}
      </div>

    </div>
  );
};

export default AiTips;