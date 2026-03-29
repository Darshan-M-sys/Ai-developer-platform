import React from "react";
import ReactMarkdown from "react-markdown";

const LessonDescription = ({ lesson }) => {
  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <div className="bg-white ">

      {/* Lesson Title */}
      <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>

      {/* Lesson Markdown Description */}
      <div className="prose max-w-none">
        <ReactMarkdown>{lesson.description}</ReactMarkdown>
      </div>

      {/* What you will learn */}
      <div>
        <h2 className="text-xl font-semibold mb-3">What you will learn</h2>

        <ul className="space-y-2">
          {lesson.whatYouWillLearn.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500">✔</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonDescription;