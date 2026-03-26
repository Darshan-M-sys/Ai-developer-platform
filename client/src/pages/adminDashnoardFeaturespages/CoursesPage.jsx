import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard.jsx/AdminSidebar";
import {Link, useNavigate} from  'react-router-dom'
import axios from "axios";
import { useState } from "react";

const CoursesPage = () => {
 const nav=useNavigate()
  /* ---------------- Chart Data ---------------- */

  const courseStudents = [
    { name: "React", students: 320 },
    { name: "Node.js", students: 240 },
    { name: "Python", students: 410 },
    { name: "AI", students: 290 },
  ];
 const [isDeleted,setIsDeleted]=useState(false)
  /* ---------------- Table Data ---------------- */

 
 const [courses,setCourses]=useState([]);
 const handleGetAllCourses=async()=>{
  try {
    const res= await axios.get("http://localhost:5000/admin/course",{withCredentials:true});
    setCourses(res.data?.data || [])
  } catch (error) {
    console.log(error)
  }
 }
 useEffect(()=>{
handleGetAllCourses();
 },[isDeleted])

   const HandleCourseDelete=async(id)=>{
     try {
       const res= await axios.delete(`http://localhost:5000/admin/course/${id}`,{withCredentials:true});
     if(res.data?.success){
       nav("/admin/courses")
       setIsDeleted(true)
     }
     } catch (error) {
       console.log(error.message)
     }
   }

  return (
    <>
    <Header/>
    <AdminSidebar/>
    <div className="md:ml-[280px] md:mt-[66px] mt-[55px] bg-gray-100 p-1 md:p-6">

      {/* Heading */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Courses Management</h1>
          <p className="text-gray-500">Manage and monitor all platform courses.</p>
        </div>

        {/* Add Course Button */}
        <Link to="/admin/course/create"><button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
          + Add Course
          </button>
        </Link>
      </div>

      {/* Chart Section */}
      <div className="bg-white  p-1 md:p-6 rounded-2xl shadow-md mb-10">
        <h2 className="font-semibold mb-4">Course Popularity</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={courseStudents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Course Name</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Students</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{course.title}</td>

                <td className="p-4 text-gray-600">{course.instructor?.name}</td>

                <td className="p-4">{course.students || 0}</td>

                <td className="p-4 flex gap-3">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600">
                    Edit
                  </button>

                  <button  onClick={()=>HandleCourseDelete(course._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
       <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            <div className="w-full h-44 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-fit"
              />
            </div>

            {/* Content */}
            <div className="p-4 bg-gray-100">
              <p className="text-xs text-gray-500 mb-1">{course.category}</p>
             <div className="flex gap-4">
              <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                {course.title}
              </h3>
               <div className="flex items-center gap-1 ">
                <img src={course.instructor?.avatar}  className="w-[25px] h-[25px] " alt="profile" />
                <p className="font-semibold text-sm text-gray-900 ">{course.instructor?.name}</p>
                </div>
                </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                  {course.students} Students
                </span>
                 
                <span className="text-base font-semibold text-black">
                  {course.price}
                </span>
              </div>

            <Link to={`/admin/course/${course._id}`} >    <button className="w-full mt-4 bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition">
                View Course
              </button></Link>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
  );
};

export default CoursesPage;