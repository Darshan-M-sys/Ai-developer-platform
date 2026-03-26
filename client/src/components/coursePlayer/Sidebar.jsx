import React from "react";
import { TfiClose } from "react-icons/tfi";

const Sidebar = ({ lessons, currentLesson, setCurrentLesson}) => {
  return (
   <div className="w-[280px] h-screen bg-white relative  z-40 shadow-md p-4 overflow-y-auto">

      {/* Title */}
   <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Course Content
      </h2>
    
  

      {/* Lesson List */}
      <div className="space-y-2">
        {lessons .map((lesson, index) => (
          <div
            key={lesson.id}
            onClick={() => setCurrentLesson(lesson)}
            className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition
              ${
                currentLesson?.id === lesson.id
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
          >
            {/* Left Side */}
            <div>
              <p className="text-sm font-medium">
                {index + 1}. {lesson.title}
              </p>

              <p className="text-xs text-gray-500">
                {lesson.duration}
              </p>
            </div>

            {/* Right Side (Status) */}
            <div>
              {lesson.completed ? (
                <span className="text-green-500 text-sm">✔</span>
              ) : currentLesson?.id === lesson.id ? (
                <span className="text-blue-500 text-sm">▶</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;