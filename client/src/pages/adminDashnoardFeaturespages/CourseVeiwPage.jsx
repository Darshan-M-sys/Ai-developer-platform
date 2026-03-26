import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard.jsx/AdminSidebar";
import {Link} from "react-router-dom"
const CourseView = () => {
  const [course,setCourse]=useState({});
  const {id}=useParams();
  const handleGetCourseData=async()=>{
    try {
      const res= await axios.get(`http://localhost:5000/admin/course/${id}`,{withCredentials:true});
      setCourse(res.data?.data || {})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
  handleGetCourseData();
  },[id])
  return (
    <>
    <Header/>
    <AdminSidebar/>
    <div className="md:ml-[280px] md:mt-[66px] mt-[55px] min-h-screen bg-gray-50 md:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-3 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Instructor: {course.instructor?.name}
            </p>
          </div>

          <div className="flex gap-3">
           <Link to={'/admin/course/create'} state={id}> <button className="bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition">
              Edit Course
            </button></Link>

            <button className="border border-gray-300 px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition">
              Delete Course
            </button>
          </div>
        </div>

        {/* Course Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {course.duration}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Students</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {course.students}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {course.price}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Instructor</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {course.instructor?.name}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Course Description
          </h2>
          <div className="text-gray-600 leading-relaxed prose max-w-none text-sm md:text-base">
            <ReactMarkdown>

            {course.description}
            </ReactMarkdown>
          </div>
        </div>

        {/* What You Will Learn */}
        <div className="mb-8">
     <div className="text-gray-600 leading-relaxed prose max-w-none text-sm md:text-base">
            <ReactMarkdown>

            {course.youWillLearn}
            </ReactMarkdown>
          </div>
         
        </div>

     <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="bg-black text-white px-6 py-3 rounded-xl text-sm md:text-base font-medium hover:bg-gray-900 transition">
            View Lessons
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-xl text-sm md:text-base font-medium hover:bg-gray-100 transition">
            Problems
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseView;