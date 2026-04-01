import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CoursesGrowth = () => {
  const data = [
    { month: "Jan", courses: 1 },
    { month: "Feb", courses: 2 },
    { month: "Mar", courses: 3 },
    { month: "Apr", courses: 5 },
    { month: "May", courses: 7 },
    { month: "Jun", courses: 10 },
  ];

  return (
    <div className="bg-white shadow w-full rounded-2xl p-1 md:p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Courses Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="courses"
            stroke="#9333ea"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoursesGrowth;