import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import Sidebar from "../../components/learnerDashboard/SideBar";
import axios from "axios";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ProgressBarChart from "./ProgressBarChart";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const nav = useNavigate();

  /* =============================
     GET ALL ENROLLED COURSES
  ============================= */
  const handleGetEnrolledCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/student/enrollment/all",
        { withCredentials: true }
      );

      setCourses(res.data?.data || []);
   
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetEnrolledCourses();
  }, [courses.length]);

  /* =============================
     CONTINUE LEARNING BUTTON
  ============================= */

  const handleContinueLearning = async (courseId) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/student/course/progress/${courseId}`,
      { withCredentials: true }
    );

    let lessonId = res.data?.data?.currentLesson._id;

    // if no progress yet, open first lesson
    if (!lessonId) {
      const lessonsRes = await axios.get(
        `http://localhost:5000/student/lessons/all/${courseId}`,
        { withCredentials: true }
      );

      const lessons = lessonsRes.data?.data || [];

      if (lessons.length > 0) {
        lessonId = lessons[0]._id;
      }
    }

    if (lessonId) {
      nav(`/learner/course/${courseId}/lesson/${lessonId}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};


const [progressData, setProgressData] = useState([]);

useEffect(() => {

  const formattedData = courses.map((data, index) => {
    
    const lessons = data.lessonData.map((l) => {
      const lessonPresent = data.progressData?.lessonProgress?.find(
        (ld) => ld.lessonId === l._id
      );

      return {
        _id: l._id,
        title: l.title,
        progress: lessonPresent ? lessonPresent.progress : 0,
      };
    });

    return {
      courseId: {
        _id: data?.enrollmentCourses?.courseId?._id || index,
        title: data?.enrollmentCourses?.courseId?.title || "",
        totalProgress:data?.progressData?.courseCompletion
      },
      lessons: lessons,
    };
  });

  setProgressData(formattedData);

}, [courses]);




  return (
    <>
      <Header />
      <Sidebar />
  
      <div className="md:p-6 p-2 md:mt-[66px] mt-[55px] md:ml-[280px] md:p-10 min-h-screen bg-gray-100">
        
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          My Enrolled Courses
        </h1>

        {/* COURSES GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const courseData = course.enrollmentCourses?.courseId;

            return (
              <div
                key={course.enrollmentCourses?._id}
                className="bg-white rounded-2xl relative shadow-md hover:shadow-xl transition p-4"
              >
                {/* INFO ICON */}
                <Link to={`/learner/course/${course.enrollmentCourses?._id}`}>
                  <p className="absolute right-4 p-1 bg-white rounded-full shadow-xl">
                    <BsFillInfoCircleFill fontSize={28} />
                  </p>
                </Link>

                {/* COURSE IMAGE */}
                <img
                  src={courseData?.thumbnail}
                  alt={courseData?.title}
                  className="w-full h-44 object-cover rounded-xl"
                />

                {/* COURSE INFO */}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">
                    {courseData?.title}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Instructor: {course.instructorData?.name}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {course.lessonCount} Lessons
                  </p>

                  {/* PROGRESS BAR (dynamic) */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${course.progressData?.courseCompletion || 0}%` }}
                      ></div>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      {course.progressData?.courseCompletion || 0}% Completed
                    </p>
                  </div>

                  {/* CONTINUE LEARNING BUTTON */}
                  <button
                    onClick={() => handleContinueLearning(courseData?._id)}
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                  >
                    Continue Learning
                  </button>
                  
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 bg-gray-200 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Course Progress Overview</h2>
         <div className="flex items-center justify-between mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
          
           {progressData.map((getCourseProgress,index)=>{
              return(
                <div>
   <ProgressBarChart getCourseProgress={getCourseProgress} />
                </div>
              )
           })}
           </div>
      </div>
      </div>
        </div>

    </>
  );
};

export default EnrolledCourses;