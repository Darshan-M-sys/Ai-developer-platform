import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import Sidebar from "../../components/learnerDashboard/SideBar";
import axios from "axios";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

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
  }, []);

  /* =============================
     CONTINUE LEARNING BUTTON
  ============================= */
  const handleContinueLearning = async (courseId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/student/lessons/all/${courseId}`,
        { withCredentials: true }
      );

      const lessons = res.data?.data || [];

      if (lessons.length > 0) {
        nav(`/learner/course/${courseId}/lesson/${lessons[0]._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
                <Link to={`/learner/course/${courseData?._id}`}>
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
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      {course.progress || 0}% Completed
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
      </div>
    </>
  );
};

export default EnrolledCourses;