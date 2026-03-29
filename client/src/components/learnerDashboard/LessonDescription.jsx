import React from "react";
import ReactMarkdown from "react-markdown";

const LessonDescription = ({ lesson }) => {
  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <div className="bg-white ">

      {/* Lesson Title */}
      <h1 className="text-2xl font-bold text-gray-800">{lesson.lessonName}</h1>

      {/* Lesson Markdown Description */}
      <div className="prose max-w-none">
        <ReactMarkdown>{lesson.description}</ReactMarkdown>
      </div>

      {/* What you will learn */}
     
    </div>
  );
};

export default LessonDescription;