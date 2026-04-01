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

const EnrollmentGraph = () => {
  const data = [
    { month: "Jan", students: 40 },
    { month: "Feb", students: 65 },
    { month: "Mar", students: 90 },
    { month: "Apr", students: 120 },
    { month: "May", students: 160 },
    { month: "Jun", students: 200 },
  ];

  return (
    <div className="bg-white w-full shadow rounded-2xl  p-1 md:p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Enrollment Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="students"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnrollmentGraph;