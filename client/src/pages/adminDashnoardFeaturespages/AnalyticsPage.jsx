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
import AdminStats from "../../components/AdminDashboard.jsx/AdminStats";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard.jsx/AdminSidebar";

const AnalyticsPage = () => {

  /* ---------------- User Growth ---------------- */

  const userGrowth = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 350 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 650 },
    { month: "May", users: 800 },
    { month: "Jun", users: 1000 },
  ];

  /* ---------------- Student vs Instructor ---------------- */

  const platformGrowth = [
    { month: "Jan", students: 180, instructors: 20 },
    { month: "Feb", students: 300, instructors: 25 },
    { month: "Mar", students: 420, instructors: 30 },
    { month: "Apr", students: 580, instructors: 40 },
    { month: "May", students: 700, instructors: 50 },
    { month: "Jun", students: 850, instructors: 60 },
  ];

  /* ---------------- Course Analytics ---------------- */

  const courseAnalytics = [
    { name: "React", students: 320 },
    { name: "Node.js", students: 240 },
    { name: "Python", students: 410 },
    { name: "AI", students: 290 },
  ];

  return (
    <>
    <Header/>
    <AdminSidebar/>
    <div className=" md:ml-[280px] bg-gray-100  md:mt-[66px] mt-[55px] md:p-6">

      {/* Heading */}
      
      <AdminStats/>

      {/* Charts Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* User Growth */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4">User Growth</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Student vs Instructor Growth */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4">Student vs Instructor Growth</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={platformGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="instructors" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Charts Section 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h2 className="font-semibold mb-4">Course Popularity</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={courseAnalytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
    </>
  );
};

export default AnalyticsPage;