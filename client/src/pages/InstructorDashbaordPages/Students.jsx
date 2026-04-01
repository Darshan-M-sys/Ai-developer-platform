
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import EnrollmentGraph from "../../components/InstructorDashbaord/EnrollmentGrahp";
import Header from "../../components/home/Header";
import Sidebar from "../../components/InstructorDashbaord/Sidebar";

const Students = () => {
  const students = [
    {
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      course: "React Course",
      date: "12 Mar 2025",
      status: "Active",
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    {
      name: "Sneha R",
      email: "sneha@gmail.com",
      course: "JavaScript Course",
      date: "15 Mar 2025",
      status: "Active",
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    {
      name: "Arjun",
      email: "arjun@gmail.com",
      course: "Python Course",
      date: "20 Mar 2025",
      status: "Pending",
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  ];

  return (
    <>
    <Header/>
    <div className="md:mt-[66px] mt-[55px]">
 <Sidebar/>
    </div>
    <div className="p-6 md:ml-[250px] md:mt-[66px] mt-[55px]">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">My Students</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search students..."
        className="w-full md:w-1/3 mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Students Table */}
      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Email</th>
              <th className="p-4">Course</th>
              <th className="p-4">Enrolled Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                {/* Student Info */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={student.image}
                    alt="student"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold">{student.name}</p>
                </td>

                <td className="p-4 text-gray-600">{student.email}</td>
                <td className="p-4">{student.course}</td>
                <td className="p-4">{student.date}</td>

                {/* Status Badge */}
                <td className="p-4 flex gap-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                                     <FiEdit />
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
       <EnrollmentGraph/>
    </div>
   
    </>
  );
};

export default Students;