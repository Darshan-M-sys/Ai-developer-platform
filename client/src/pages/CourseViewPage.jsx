import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import {Link} from "react-router-dom"
import Header from "../components/home/Header";
import EnrollPopup from "../components/EnrollPopup";
import EnrollSuccess from "../components/EnrollSuccess";
import ViewCourseLessonList from "../components/ViewCourseLessonList";

const CourseViewPage = () => {


  const[isOpenSuccess,setIsOpenSuccess]=useState(false)
  const nav=useNavigate()
const [course, setCourse] = useState({});
const { id } = useParams();
const[isOpen,setIsOpen]=useState(false)
const [isLessonListOpen,setIsLessonListOpen]=useState(false);

const handleGetCourse=async()=>{
  try {
    const res= await  axios.get(`http://localhost:5000/public/course/${id}`);
    setCourse(res.data?.data || {})
  } catch (error) {
   console.log(error.message) 
  }
}

const handleProgressCreate=async()=>{
  try {
    const res= await axios.post(`http://localhost:5000/student/course-progress/${id}`,{},{withCredentials:true});
  } catch (error) {
    console.log(error.message)
  }
}

const onConfirm=async()=>{
try {
  const  res= await axios.post(`http://localhost:5000/student/enrollment/${id}`,{},{withCredentials:true});
          await handleProgressCreate();
        if(res.data.success){
          setIsOpen(false);
          setIsOpenSuccess(true);
        }
} catch (error) {
  console.log(error.response);
}
}

useEffect(()=>{
handleGetCourse()
},[id])
  return (
    <>
    <Header/>
     
    <div className=" md:mt-[66px]  mt-[55px] min-h-screen bg-gray-50 md:p-6">
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

        </div>

        {/* Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm  text-gray-500">Lessons</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {course.lessonData?.length}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm  text-gray-500">Duration</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {course.duration}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Students</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {course.studentCount}
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
        <button onClick={()=>setIsOpen(true)} className="bg-black text-white px-6 py-3 rounded-xl text-sm md:text-base font-medium hover:bg-gray-900 transition">
       
            Enroll Now
          </button> 

          <button onClick={()=>setIsLessonListOpen(true)} className="border border-gray-300 px-6 py-3 rounded-xl text-sm md:text-base font-medium hover:bg-gray-100 transition">
            View Lessons
          </button>
          <ViewCourseLessonList isLessonListOpen={isLessonListOpen} setIsLessonListOpen={setIsLessonListOpen} lessons={course.lessonData || []}/>
          <EnrollPopup isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm}/>
          <EnrollSuccess  isOpenSuccess={isOpenSuccess} setIsOpenSuccess={setIsOpenSuccess}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseViewPage;