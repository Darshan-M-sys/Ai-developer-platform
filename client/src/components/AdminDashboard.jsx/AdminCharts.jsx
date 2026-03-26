import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const AdminCharts = () => {

  const userGrowth = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 350 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 650 },
    { month: "May", users: 800 },
    { month: "Jun", users: 1000 },
  ];

  const courseStats = [
    { name: "React", students: 320 },
    { name: "Node", students: 240 },
    { name: "Python", students: 410 },
    { name: "AI", students: 290 },
  ];

  return (
    <div className="w-full p-1 md:p-6">

      <h1 className="text-3xl font-bold mb-8">Analytics Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* User Growth Chart */}
        <div className="bg-white md:p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#2563eb"  strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Popularity Chart */}
        <div className="bg-white md:p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Popular Courses</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" radius={[10,10]} fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminCharts;