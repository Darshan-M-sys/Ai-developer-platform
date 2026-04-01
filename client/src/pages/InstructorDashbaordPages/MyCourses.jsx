import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Header from "../../components/home/Header";
import Sidebar from "../../components/InstructorDashbaord/Sidebar";
import CoursesGrowth from "../../components/InstructorDashbaord/CoursesGrowth";
import EnrollmentGraph from "../../components/InstructorDashbaord/EnrollmentGrahp";
import { Info } from "lucide-react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const MyCourses = () => {

  const [courses,setCourses]=useState([])
    const handleGetMyCourses=async()=>{
try {
  const res=await axios.get("http://localhost:5000/instructor/courses",{withCredentials:true});
 setCourses(res.data?.data || [])
 console.log(res.data.data)
} catch (error) {
  console.log(error)
}
  }
  
  useEffect(()=>{
handleGetMyCourses();
  },[])
  // const courses = [
  //   {
  //     title: "React for Beginners",
  //     students: 120,
  //     price: "₹999",
  //     status: "Published",
  //     image: "https://cdn-icons-png.flaticon.com/512/2721/2721276.png",
  //   },
  //   {
  //     title: "JavaScript Mastery",
  //     students: 95,
  //     price: "₹799",
  //     status: "Published",
  //     image: "https://cdn-icons-png.flaticon.com/512/2721/2721276.png",
  //   },
  //   {
  //     title: "Python Basics",
  //     students: 60,
  //     price: "₹699",
  //     status: "Draft",
  //     image: "https://cdn-icons-png.flaticon.com/512/2721/2721276.png",
  //   },
  // ];

  return (
    <> 
    <Header/>
    <div className="md:mt-[66px] mt-[55px]">
    <Sidebar/> 
    </div>
      <div className="p-6 md:mt-[66px] mt-[55px] ml-[260px]">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow  relative rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="absolute right-0 top-0 rounded-xl flex gap-2 bg-white/40 p-1 " title="Add Lessons">
             <Link to={`/instructor/course/info/${course.course?._id}`}>  <button className="p-2 bg-white text-xl shadow  w-full rounded-full"><Info/></button></Link>
               <Link to={course.lessonData?.length>0?`/instructor/course/${course.course?._id}/lesson/${course.lessonData[0]._id}`:""}><button className=" p-[10px] bg-white text-xl flex  w-full items-center shadow rounded-full"><MdOutlineAdd /></button></Link>
              <button className=" p-2 bg-white text-xl flex  w-full items-center shadow rounded-full"><Info/></button>
              </div>
            {/* Course Image */}
            <img
              src={course.course?.thumbnail}
              alt="course"
              className="w-full h-40 object-cover"
            />

            {/* Course Content */}
            <div className="p-4 w-full">
              <h2 className="text-lg font-bold mb-2">{course.course?.title}</h2>
<div className="flex justify-between w-full">
              <p className="text-gray-500 text-sm mb-2">
                Students: {course.studentsCount}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Lessons: {course.lessonsCount}
              </p>
 </div>
 <div className="flex justify-between w-full">
              <p className="text-gray-700 font-semibold mb-2">
                Price: {course.course?.price}
              </p>
              <p className="text-gray-700 font-semibold mb-2">
                Duration: {course.course?.duration}
              </p>

</div>
              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  course.course?.status === 'published'
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {course.course?.status}
              </span>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
               <Link to="/instructor/add/course/" state={course.course?._id} className="flex-1 bg-blue-600 text-center text-white py-2 rounded-lg hover:bg-blue-700">
                  <FiEdit className="inline mr-2" />
                  Edit
               
</Link>
                <button disabled={!course.isCreator} className={`flex-1 ${course.isCreator?"":"opacity-[0.2] cursor-not-allowed"} bg-red-600 text-white py-2 rounded-lg hover:bg-red-700`}>
                  <FiTrash2 className="inline mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
          <EnrollmentGraph/>
    <CoursesGrowth/>
    </div>
  
  
    </>
  );
};

export default MyCourses;