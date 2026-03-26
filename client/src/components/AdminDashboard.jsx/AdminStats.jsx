import React from "react";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";

const AdminStats = () => {
  const [stats,setStatus]=useState({});
  const handleGetStatsData=async()=>{
try {
  const res= await axios.get("http://localhost:5000/admin/stats",{withCredentials:true});
  setStatus(res.data?.data || {})
} catch (error) {
  console.log(error.message)
}
  }
  useEffect(()=>{
  handleGetStatsData();
  },[])
  return (
    <div className="w-full p-6">

      {/* Heading */}
     

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300   hover:shadow-blue-500 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-white">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers || 0}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300   hover:shadow-purple-500 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-white">Students</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalStudents || 0}</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300   hover:shadow-orange-500 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-white">Instructors</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalInstructors || 0}</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-600 transition-all duration-300   hover:shadow-pink-500 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-white">Course</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalCourses || 0}</p>
        </div>

      </div>

    </div>
  );
};

export default AdminStats;