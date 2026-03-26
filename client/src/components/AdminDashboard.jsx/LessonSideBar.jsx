import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const LessonSideBar = ({ lessons, selectedLesson, open,setOpen, setSelectedLesson }) => {
 

  return (
    <>
      
      

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed  top-[72px]   left-0 h-screen bg-white border-r flex flex-col
        w-72 sm:w-80 md:w-80
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-5 border-b flex  justify-between gap-9  items-center">
          
          <h2 className="text-lg md:text-2xl font-semibold">Lessons</h2>
          {/* Close Button (mobile only) */}
         
             <button className="w-[70%] m-auto bg-black text-white py-2 rounded-lg">
            Add Lesson
          </button>
           <button
            onClick={() => setOpen(false)}
            className="md:hidden text-xl"
          >
            <MdClose/>
          </button>
        </div>
      

        {/* Lesson List */}
        <div className="flex-1 overflow-y-auto p-4">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              onClick={() => {
                setSelectedLesson(lesson);
                setOpen(false); // close sidebar on mobile
              }}
              className={`p-4 mb-3 rounded-lg cursor-pointer border transition-all
              ${
                selectedLesson?._id === lesson._id
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <h3 className="font-medium text-sm md:text-base">
                {lesson.title}
              </h3>

              <p
                className={`text-xs md:text-sm ${
                  selectedLesson?._id === lesson._id
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {lesson.duration}
              </p>
            </div>
          ))}
        </div>

        {/* Add Lesson Button */}
    
      </div>
    </>
  );
};

export default LessonSideBar;