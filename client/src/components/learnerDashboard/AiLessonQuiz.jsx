import React, { useState } from "react";

const AiLessonQuiz = () => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const quiz = [{
    question: "What is a variable in Python?",
    options: [
      "A function used to print output",
      "A container used to store data",
      "A loop used to repeat code",
      "A keyword used to define classes",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the correct way to define a function in Python?",
    options: [
      "function myFunction():",
      "def myFunction():",
      "func myFunction():",
      "define myFunction():",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which of the following is a valid variable name in Python?",
    options: [
      "2ndVariable",
      "my-variable",
      "my_variable",  
      "my variable",
    ],
    correctAnswer: 2,
  },
];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-2xl mx-auto space-y-5">

      {/* Title */}
      <h2 className="text-xl font-bold">🧠 AI Quiz</h2>

      {/* Question */}
      <p className="text-lg font-medium text-gray-800">{quiz.question}</p>

      {/* Options */}
      <div className="space-y-3">
        {
          quiz.map((q, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-md font-semibold text-gray-700">{q.question}</p> 

        {q.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`w-full text-left p-3 rounded-lg border transition
              ${
                selected === index
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
          ))
        }
      </div>


      {/* Submit Button */}
      <button
        onClick={() => setShowResult(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Answer
      </button>

      {/* Result */}
      {showResult && (
        <div className="p-4 rounded-lg bg-gray-100">
          {selected === quiz.correctAnswer ? (
            <p className="text-green-600 font-semibold">✅ Correct Answer!</p>
          ) : (
            <p className="text-red-600 font-semibold">
              ❌ Wrong Answer. Try again!
            </p>
          )}
        </div> 
      )}
    </div>
  );
};

export default AiLessonQuiz;