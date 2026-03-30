import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProgressBarChart = ({getCourseProgress}) => {


  // Demo data (weekly learning progress)
  useEffect(() => {
   
     

  }, []);
const [animate, setAnimate] = useState(false);

useEffect(() => {
  setTimeout(() => {
    setAnimate(true);
  }, 300); // small delay makes animation smooth
}, []);
  return (
    <div className="bg-white/80 shadow-md rounded-xl p-4 w-full">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-6">
      {getCourseProgress?.courseId?.title || "Course Progress"}
      </h3>
      <h3 className="text-sm font-semibold text-gray-700 mb-6">
         {getCourseProgress?.courseId?.totalProgress}%
      </h3>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between h-40 gap-1">
  {getCourseProgress?.lessons?.map((item, index) => (
    <div key={index} className="flex flex-col items-center gap-1">

      <div className="relative w-2 h-40">
        
        {/* Grey background bar */}
        <div className="absolute bottom-0 w-full h-full bg-gray-100 rounded-md"></div>

        {/* Animated blue bar */}

        <div onClick={()=>window.location.href=`/learner/course/${getCourseProgress?.courseId?._id}/lesson/${item._id}`}
        title={`${item.title}: ${item.progress}%`}
          className={`absolute bottom-0 w-full cursor-pointer${item.progress>=95?" bg-pink-500":" bg-blue-600"} ${item.progress>50&&item.progress<95 ? " bg-yellow-500" : ""} rounded-md transition-all duration-700 ease-out`}
          style={{ height: animate ? `${item.progress>95 ? 100 :  item.progress}%` : "0%" }}
        ></div>
      </div>

      <p className="text-xs text-gray-500">{index+1}</p>
      
    </div>
    
  ))}
 
</div>  

             
          
           
       <div className="flex items-center justify-between mt-4  gap-5 cursor-pointer">
        <p className="text-xs text-gray-500 text-start">Completed {((getCourseProgress?.courseId?.totalProgress/100)*10|| 1)}/{getCourseProgress?.lessons?.length || 1}</p>
 <p className="text-xs text-gray-500 text-center">Lessons</p>
 <Link to={`/learner/course/${getCourseProgress?.courseId?._id}/lesson/${getCourseProgress?.lessons?.find((_, i) => i===Math.min(...getCourseProgress?.lessons?.map((l) => l.progress)))?._id}`} className="flex items-center gap-1 text-sm font-medium"> 
 <p className="flex text-sm items-center text-blue-500 justify-center gap-1 "> Continue Learning <FiArrowRight/></p> </Link>
 </div>

    </div>
  );
};

export default ProgressBarChart;