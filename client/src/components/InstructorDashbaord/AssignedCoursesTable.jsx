import React from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";

const AssignedCoursesTable = () => {
  const assignedCourses = [
    {
      title: "React for Beginners",
      instructor: "Darshan",
      email: "darshan@gmail.com",
      date: "10 Mar 2025",
      status: "Assigned",
    },
    {
      title: "JavaScript Mastery",
      instructor: "Rahul Kumar",
      email: "rahul@gmail.com",
      date: "12 Mar 2025",
      status: "Assigned",
    },
    {
      title: "Python Basics",
      instructor: "Sneha R",
      email: "sneha@gmail.com",
      date: "15 Mar 2025",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Assigned Courses</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Course</th>
              <th className="p-3">Instructor</th>
              <th className="p-3">Email</th>
              <th className="p-3">Assigned Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignedCourses.map((course, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{course.title}</td>

                <td className="p-3">{course.instructor}</td>
                <td className="p-3 text-gray-600">{course.email}</td>
                <td className="p-3">{course.date}</td>

                {/* Status Badge */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      course.status === "Assigned"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-3">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    <FiEye />
                  </button>

                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
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

export default AssignedCoursesTable;