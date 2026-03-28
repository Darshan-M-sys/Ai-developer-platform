import { Book } from "lucide-react";
import React from "react";

const StatsCards = ({statsData}) => {
  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className=" p-4 transition-all duration-300 bg-gradient-to-r  from-purple-500 to-purple-600 rounded-xl shadow hover:shadow-xl hover:shadow-purple-500">
      
  <div className="flex  items-center gap-2">
    <p className="text-3xl">📚</p>
    <p className="text-white">Courses</p>
  </div>

  <h3 className="text-3xl indent-5 font-bold mt-3">{statsData.courseEnrolled || 0}</h3>
</div>

      <div className=" p-4 transition-all duration-300 bg-gradient-to-r  from-blue-500 to-blue-600 rounded-xl shadow hover:shadow-xl hover:shadow-blue-500">
      <div className="flex  items-center gap-2">
    <p className="text-3xl">🧠</p>
    <p className="text-white">Problem Solved</p>
  </div>
        <h3 className="text-3xl  font-bold mt-3">{statsData.problemSolved|| 0}</h3>
      </div>
      <div className=" p-4 transition-all duration-300 bg-gradient-to-r  from-orange-500 to-orange-600 rounded-xl shadow hover:shadow-xl hover:shadow-orange-500">
      <div className="flex  items-center gap-2">
    <p className="text-3xl">🔥</p>
    <p className="text-white">Learning Streak</p>
  </div>
        <h3 className="text-3xl  font-bold mt-3">{statsData.learningStreak|| 1} Days</h3>
      </div>

   

    </div>

  );
};

export default StatsCards;