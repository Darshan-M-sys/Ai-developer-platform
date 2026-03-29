import React from "react";
import { MdClose } from "react-icons/md";

const LearningScreenSidebar = ({
  lessons,
  currentLessonId,
  onSelectLesson,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed  top-[55px] md:top-[66px] left-0 h-screen bg-white z-30
        w-[85%] sm:w-[70%] md:w-[55%] lg:w-[300px]
        border-r overflow-y-auto
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Title */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Lessons</h2>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-xl"
          >
            <span className="material-icons"><MdClose/></span>
          </button>
        </div>

        {/* Lesson List */}
        <div className="p-3 space-y-2">
          {lessons.map((lesson, index) => {
            const active = lesson._id === currentLessonId;

            return (
              <div
                key={lesson._id}
                onClick={() => {
                  onSelectLesson(lesson._id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  p-3 rounded-lg cursor-pointer transition duration-200
                  ${active
                    ? "bg-blue-50 border border-blue-400"
                    : "hover:bg-gray-100"}
                `}
              >
                <p className="text-xs text-gray-400">Lesson {index + 1}</p>

                <h4
                  className={`text-sm font-semibold ${
                    active ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {lesson.title}
                </h4>

                {lesson.duration && (
                  <p className="text-xs text-gray-500 mt-1">
                    {lesson.duration}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LearningScreenSidebar;