import React from "react";
import CourseCard from "../components/CourseCard";

const Courses = () => {

  const courses = [
    {
      id: 1,
      title: "JavaScript Mastery",
      lessons: 40,
      level: "Beginner",
      instructor: "Darshan Kumar",
      rating: 4.7,
      students: 1200,
      image: "https://source.unsplash.com/400x250/?javascript"
    },
    {
      id: 2,
      title: "React Complete Guide",
      lessons: 55,
      level: "Intermediate",
      instructor: "John Doe",
      rating: 4.8,
      students: 2000,
      image: "https://source.unsplash.com/400x250/?react"
    },
    {
      id: 3,
      title: "Node.js Backend",
      lessons: 35,
      level: "Intermediate",
      instructor: "Alex Smith",
      rating: 4.6,
      students: 900,
      image: "https://source.unsplash.com/400x250/?nodejs"
    },
    {
      id: 4,
      title: "MongoDB & Database Design",
      lessons: 30,
      level: "Beginner",
      instructor: "Sarah Lee",
      rating: 4.5,
      students: 800,
      image: "https://source.unsplash.com/400x250/?database"
    }
  ];

  const handleOpenCourse = (course) => {
    console.log("Open Course:", course);

    // later:
    // navigate(`/course/${course.id}`)
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Explore Courses 🚀
        </h1>
        <p className="text-gray-500 mt-1">
          Learn and upgrade your skills with top courses
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            {...course}
            onClick={() => handleOpenCourse(course)}
          />
        ))}
      </div>

    </div>
  );
};

export default Courses;