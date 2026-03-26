import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard.jsx/AdminSidebar";
import axios from "axios";
import AddInstructor from "../../components/AdminDashboard.jsx/AddInstructor";
import ActionDisplay from "../../components/ActionDisplay";

const InstructorPage = () => {
 const [action,setAction]=useState({
  show:false,
  message:"",
  type:""
 })
  /* ---------------- Growth Data ---------------- */

  const instructorGrowth = [
    { month: "Jan", instructors: 5 },
    { month: "Feb", instructors: 8 },
    { month: "Mar", instructors: 12 },
    { month: "Apr", instructors: 18 },
    { month: "May", instructors: 24 },
    { month: "Jun", instructors: 32 },
  ];

  const courseInstructors = [
    { name: "React", instructors: 6 },
    { name: "Node.js", instructors: 4 },
    { name: "Python", instructors: 7 },
    { name: "AI", instructors: 5 },
  ];
  const [onOpenAddInst,setOnOpenAddInst]=useState(false)
  /* ---------------- Table Data ---------------- */

   const [instructors,setInstructors]=useState([]);
    const handleGetInstructors=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/admin/instructors",{withCredentials:true});
      setInstructors(res.data?.data || [])
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
   handleGetInstructors();
  },[onOpenAddInst])

  return (
    <>
    <Header/>
    <AdminSidebar/>
 {action.show && (
  <ActionDisplay
    message={action.message}
    type={action.type}
    onClose={() => setAction((prev) => ({ ...prev, show: false }))}
  />
)}
    {onOpenAddInst&&(
    <AddInstructor setOnOpenAddInst={setOnOpenAddInst} setAction={setAction}/>)}
    <div className="md:mt-[66px] mt-[55px] md:ml-[280px] bg-gray-100 p-1  md:p-6">

      {/* Heading */}
      <div className="flex justify-between items-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
        <p className="text-gray-500">Track instructor growth and activity.</p>

      </div>
        <button onClick={()=>setOnOpenAddInst(true)} className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
          + Add Instructor
        </button>
        </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* Instructor Growth Chart */}
        <div className="bg-white p-1 md:p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4">Instructor Growth</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={instructorGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="instructors" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course-wise Instructors Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4">Course-wise Instructors</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseInstructors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="instructors" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Instructors Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Course</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor?.instructor.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{instructor?.instructor.name}</td>

                <td className="p-4 text-gray-600">{instructor?.instructor.email}</td>
<td className="p-4 relative group">

  {/* Show only first course */}
  <span className="font-medium group-hover:hidden">
    {instructor?.course[0]?.title|| "Not yet"}
  </span>

  {/* Hover box */}
  <div className="absolute left-0 z-50 top-4 transition-all duration-300 hidden group-hover:block 
                  bg-white shadow-lg rounded-lg p-3 w-40 ">

    {instructor?.course.map((item, index) => (
      <div key={index} className="text-sm py-1 border-b last:border-none">
        {item?.title || "Not yet"}
      </div>
    ))}

  </div>

</td>

  <td className="p-4 flex gap-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                    View
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Remove
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
    </>
  );
};

export default InstructorPage;