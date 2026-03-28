import React from "react";
import { X, Lock } from "lucide-react";

const ViewCourseLessonList = ({ isLessonListOpen, setIsLessonListOpen, lessons = [] }) => {
  if (!isLessonListOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      {/* Popup Container */}
      <div className="bg-white w-[95%] md:w-[60%] lg:w-[45%] rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            📚 Course Lessons
          </h2>

          <button
            onClick={()=>setIsLessonListOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Lesson List */}
        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">

          {lessons.length === 0 && (
            <p className="text-gray-500 text-center">
              No lessons available
            </p>
          )}

          {lessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition"
            >
              {/* Lesson Title */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                  {index + 1}
                </div>

                <p className="text-gray-800 font-medium">
                  {lesson.title}
                </p>
              </div>

              {/* Locked Icon */}
              <Lock className="text-gray-400" size={18} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-center">
          <p className="text-sm text-gray-500">
            Enroll in this course to unlock all lessons
          </p>
        </div>

      </div>
    </div>
  );
};

export default ViewCourseLessonList;