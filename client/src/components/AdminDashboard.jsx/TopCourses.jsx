import React from "react";

const topCourses = [
  { id: 1, name: "React for Beginners", students: 320, progress: 80 },
  { id: 2, name: "Node.js Complete Guide", students: 240, progress: 65 },
  { id: 3, name: "Python for Developers", students: 410, progress: 90 },
  { id: 4, name: "AI Basics", students: 290, progress: 70 },
];

const TopCourses = () => {
  return (
    <div className="w-full p-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Top Courses</h1>
        <p className="text-gray-500">
          Most popular courses based on student enrollments.
        </p>
      </div>

      {/* Courses List */}
      <div className="bg-white shadow-md rounded-2xl p-6">

        <div className="flex flex-col gap-6">

          {topCourses.map((course) => (
            <div key={course.id} className="border-b pb-4 last:border-none">

              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">{course.name}</h2>
                <span className="text-gray-500">{course.students} students</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default TopCourses;