import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Sidebar from "../../components/InstructorDashbaord/Sidebar";
import Header from "../../components/home/Header";

const StudentProgressPage = () => {
  const progressData = [
    {
      name: "Rahul",
      course: "React",
      completed: 8,
      total: 10,
    },
    {
      name: "Sneha",
      course: "JavaScript",
      completed: 6,
      total: 12,
    },
    {
      name: "Arjun",
      course: "Python",
      completed: 4,
      total: 10,
    },
    {
      name: "Kiran",
      course: "HTML",
      completed: 9,
      total: 10,
    },
  ];

  // Convert into percentage for graph
  const chartData = progressData.map((student) => ({
    name: student.name,
    progress: Math.floor((student.completed / student.total) * 100),
  }));

  return (
    <>
    <Header/>
    <div className='md:mt-[66px] mt-[55px]'>
    <Sidebar/>
    </div>
    <div className="p-6 md:ml-[250px] md:mt-[66px] mt-[55px] space-y-8">
      {/* Title */}
      <h1 className="text-3xl font-bold">Student Progress</h1>

      {/* Graph Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Progress Graph</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Lessons Completed</th>
              <th className="p-4">Progress</th>
            </tr>
          </thead>

          <tbody>
            {progressData.map((student, index) => {
              const percent = Math.floor(
                (student.completed / student.total) * 100
              );

              return (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{student.name}</td>
                  <td className="p-4">{student.course}</td>
                  <td className="p-4">
                    {student.completed} / {student.total}
                  </td>

                  <td className="p-4 w-64">
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{percent}%</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default StudentProgressPage;