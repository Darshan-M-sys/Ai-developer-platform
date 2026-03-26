import React from "react";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md px-4 md:px-6  py-3 flex items-center justify-between">

      {/* Left section */}
      <div className="flex items-center gap-3">

        <button className="flex items-center gap-1 text-gray-600 hover:text-black text-sm md:text-base">
          <FiArrowLeft />
          <span className="hidden sm:inline">Back</span>
        </button>

        <h1 className="text-sm sm:text-base md:text-lg font-semibold truncate max-w-[120px] sm:max-w-[200px]">
          JavaScript Mastery
        </h1>

      </div>

      {/* Progress (hidden on very small screens) */}
      <div className="hidden md:block text-gray-600 text-sm font-medium">
        Lesson 3 / 20
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-3">

        <button className="flex items-center gap-1 bg-gray-100 px-2 sm:px-3 py-1 rounded hover:bg-gray-200 text-sm">
          <FiChevronLeft />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <button className="flex items-center gap-1 bg-blue-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-700 text-sm">
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight />
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
        />

      </div>

    </div>
  );
};

export default Navbar;