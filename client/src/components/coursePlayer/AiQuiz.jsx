import React, { useState } from "react";

const AIQuiz = ({ lessonTitle }) => {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [show, setShow] = useState(false);
  const [answers, setAnswers] = useState({});

  const generateQuiz = async () => {
    setLoading(true);
    setShow(true);

    // 🔥 Fake AI (replace later)
    setTimeout(() => {
      const fakeQuiz = [
       
  {
    "question": "Which process describes water changing from a liquid to a gas due to heat?",
    "options": [
      "Condensation",
      "Evaporation",
      "Precipitation",
      "Infiltration"
    ],
    "correct": "Evaporation"
  },
  {
    "question": "What is the primary energy source that drives the water cycle?",
    "options": [
      "The Moon",
      "Geothermal heat",
      "The Sun",
      "Wind currents"
    ],
    "correct": "The Sun"
  },
  {
    "question": "Which stage of the water cycle involves the formation of clouds?",
    "options": [
      "Transpiration",
      "Collection",
      "Condensation",
      "Runoff"
    ],
    "correct": "Condensation"
  }
      ];

      setQuiz(fakeQuiz);
      setLoading(false);
    }, 1000);
  };

  const handleAnswer = (qIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  return (
    <div className="mt-2">

      {/* Button */}
      <button
        onClick={generateQuiz}
        className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {/* Quiz Box */}
      {show && (
        <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
          {loading ? (
            <p>🤖 Creating quiz...</p>
          ) : (
            quiz.map((q, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium">{q.question}</p>

                {q.options.map((opt, idx) => (
                  <div key={idx}>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value={opt}
                        onChange={() => handleAnswer(i, opt)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  </div>
                ))}

                {/* Show Result */}
                {answers[i] && (
                  <p className="text-xs mt-1">
                    {answers[i] === q.correct ? (
                      <span className="text-green-600">✅ Correct</span>
                    ) : (
                      <span className="text-red-600">
                        ❌ Wrong (Ans: {q.correct})
                      </span>
                    )}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default AIQuiz;