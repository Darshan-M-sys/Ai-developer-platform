import { Link } from "react-router-dom";
import React from "react";

import { FiEdit, FiTrash2 } from "react-icons/fi";

const CoursesTable = ({courses,handleDeleteCourse}) => {
 


  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Course</th>
              <th className="p-3">Category</th>
              <th className="p-3">Students</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {/* Course Image + Title */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={course.course?.thumbnail}
                    alt="course"
                    className="w-12 h-12 rounded-lg"
                  />
                  <p className="font-semibold">{course.title}</p>
                </td>

                <td className="p-3">{course.course?.category}</td>
                <td className="p-3">{course.studentsCount}</td>
                <td className="p-3">₹{course.course?.price}</td>

                {/* Status Badge */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      course.course?.status === "published"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {course.course?.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="p-3 flex gap-3">
               <Link to={`/instructor/add/course`} state={course.course?._id}>   <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    <FiEdit />
                  </button>
</Link>
                  <button onClick={handleDeleteCourse} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;