import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "../../components/home/Header";
import Sidebar from '../../components/InstructorDashbaord/Sidebar'
import {Link} from "react-router-dom"

const CourseInfo = () => {
  const nav=useNavigate()
const [course, setCourse] = useState({});
const {courseId } = useParams();
const [lessonId,setLessonId]=useState("")

// Get course
const handleGetCourseData = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/instructor/course/${courseId}`,
      { withCredentials: true }
    );
    console.log(res.data?.data)
    setCourse(res.data?.data || {});
  } catch (error) {
    console.log(error);
  }
};

// Get lessons
const handleLesson = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/admin/lessons/${course._id}`,
      { withCredentials: true }
    );

    setLessonId(res.data?.data[0]?._id || "")
  } catch (error) {
    console.log(error);
  }
};

// Load course when page loads
useEffect(() => {
  handleGetCourseData();
}, [courseId]);

// Load lessons AFTER course is loaded
useEffect(() => {
  if (!course._id) return;   // very important

  handleLesson(course._id);
}, [course._id]);

  const HandleCourseDelete=async()=>{
    try {
      if(!window.confirm("Are you sure to delete this course!")) return ;
      const res= await axios.delete(`http://localhost:5000/admin/course/${courseId}`,{withCredentials:true});
    if(res.data?.success){
      nav("/admin/courses")
    }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
    <Header/>
    <div>
    <Sidebar/>
    </div>
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
           <Link to={'/instructor/add/course'} state={courseId}> <button className="bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition">
              Edit Course
            </button></Link>

            <button onClick={HandleCourseDelete} disabled={!course.isCreator} className={`border ${!course.isCreator?"opacity-[0.2] cursor-not-allowed":""} border-gray-300 px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition`}>
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
              {course.studentsCount}
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
        <Link to={course.lessonData?.length>0?`/instructor/course/${course._id}/lesson/${course.lessonData?.[0]?._id}`:`/admin/lesson/add/${course._id}`}>  <button className="bg-black text-white px-6 py-3 rounded-xl text-sm md:text-base font-medium hover:bg-gray-900 transition">
            View Lessons
          </button> </Link>

          <button className="border border-gray-300 px-6 py-3 rounded-xl text-sm md:text-base font-medium hover:bg-gray-100 transition">
            Problems
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseInfo;