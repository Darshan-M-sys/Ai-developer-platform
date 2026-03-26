import React from "react";
import { MdMenu } from "react-icons/md";

const LessonNav = ({ lesson, onEdit, onDelete,setOpen,open }) => {


  return (
    <div className="bg-white border-b p-4 md:p-6 ml-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Left Side */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold">{"Python Introduction"}</h2>
    <p onClick={()=>setOpen(!open)} className="text-xl md:hidden p-2 rounded-full shadow-xl bg-white ">
    <MdMenu fontSize={28}/>
       </p>
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-3">

        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Edit Lesson
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete Lesson
        </button>

      </div>

    </div>
  );
};

export default LessonNav;