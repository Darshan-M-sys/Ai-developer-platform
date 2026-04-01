import React from "react";
import { FiBookOpen, FiUsers, FiTrendingUp, FiDollarSign } from "react-icons/fi";

const Stats = ({statsData}) => {
  const stats = [
    {
      title: "Total Courses",
      value: statsData.courses || 0,
      icon: <FiBookOpen />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "Total Students",
      value: statsData.students || 0,
      icon: <FiUsers />,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Total Enrollments",
      value: statsData.enrollments || 0,
      icon: <FiTrendingUp />,
      gradient: "from-purple-500 to-purple-700",
    },
 
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mx-10 p-1">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${item.gradient} p-6 md:rounded-2xl rounded-lg  shadow-lg backdrop-blur-lg hover:scale-105 transition duration-300`}
        >
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-80">{item.title}</p>
              <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
            </div>

            <div className="text-4xl opacity-80">{item.icon}</div>
          </div>

     
        </div>
      ))}
    </div>
  );
};

export default Stats;