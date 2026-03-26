import React from "react";

const StatsCards = () => {
  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-500">Courses</p>
        <h3 className="text-2xl font-bold">5</h3>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-500">Problems Solved</p>
        <h3 className="text-2xl font-bold">120</h3>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-500">Learning Streak</p>
        <h3 className="text-2xl font-bold">7 Days</h3>
      </div>

    </div>

  );
};

export default StatsCards;