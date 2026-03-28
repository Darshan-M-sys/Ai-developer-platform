import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({
  title,
  lessons,
  level,
  _id,
  instructor,
  rating,
  students,
  thumbnail,
  onClick
}) => {
const nav=useNavigate();
  const handleRedirect=()=>{
    if(_id){
     nav(`/course/${_id}`)
    }
  }
  return (
    <div
      onClick={handleRedirect}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group"
    >

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-44 object-fit group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>

        {/* Instructor */}
        <p className="text-sm text-gray-500">
          By <span className="font-medium text-gray-700">{instructor.name}</span>
        </p>

        {/* Lessons + Level */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>📚 {lessons} Lessons</span>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {level}
          </span>
        </div>

        {/* Rating + Students */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-yellow-500 font-medium">
            ⭐ {4}
          </span>
          <span className="text-gray-500">
            👨‍🎓 {20}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={
handleRedirect
          }
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enroll Now
        </button>

      </div>
    </div>
  );
};

export default CourseCard;