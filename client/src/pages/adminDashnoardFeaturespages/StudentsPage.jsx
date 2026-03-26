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
import AdminSidebar from "../../components/AdminDashboard.jsx/AdminSidebar";
import Header from "../../components/home/Header";

const StudentsPage = () => {

  /* ---------------- Chart Data ---------------- */

  const studentGrowth = [
    { month: "Jan", students: 120 },
    { month: "Feb", students: 200 },
    { month: "Mar", students: 320 },
    { month: "Apr", students: 450 },
    { month: "May", students: 600 },
    { month: "Jun", students: 780 },
  ];

  const activeStudents = [
    { name: "React", students: 150 },
    { name: "Node", students: 110 },
    { name: "Python", students: 180 },
    { name: "AI", students: 140 },
  ];

  /* ---------------- Table Data ---------------- */

  const students = [
    { id: 1, name: "Rahul K", email: "rahul@gmail.com", course: "React" },
    { id: 2, name: "Priya R", email: "priya@gmail.com", course: "Node.js" },
    { id: 3, name: "Amit S", email: "amit@gmail.com", course: "Python" },
    { id: 4, name: "Sneha M", email: "sneha@gmail.com", course: "AI Basics" },
  ];

  return (
    <>
     <Header/>
    <AdminSidebar/>
    <div className=" md:ml-[280px] md:mt-[66px] mt-[55px] bg-gray-100  p-1 md:p-6">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Students Dashboard</h1>
        <p className="text-gray-500">Track student growth and activity.</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* Student Growth Chart */}
        <div className="bg-white p-1 md:p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4">Student Growth</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studentGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course-wise Students Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4">Course-wise Students</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activeStudents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Course</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{student.name}</td>

                <td className="p-4 text-gray-600">{student.email}</td>

                <td className="p-4">{student.course}</td>

                <td className="p-4 flex gap-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                    View
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Remove
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
    </>
  );
};

export default StudentsPage;