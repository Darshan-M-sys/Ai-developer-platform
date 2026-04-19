
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import EnrollmentGraph from "../../components/InstructorDashbaord/EnrollmentGrahp";
import Header from "../../components/home/Header";
import Sidebar from "../../components/InstructorDashbaord/Sidebar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Students = () => {
 const [isDeleted,setIsDeleted]=useState(false)
  const [students,setStudents]=useState([])
       const handleGetAllEnrolledStudents=async()=>{
        try {
        const res= await axios.get("http://localhost:5000/instructor/students",{withCredentials:true});
     setStudents(res.data?.data || []) 
    
        } catch (error) {
         console.log(error.message) 
        }
       }
  
       useEffect(()=>{
       handleGetAllEnrolledStudents();
       },[isDeleted])

const [searchText,setSearchText]=useState("")
const handleDeleteEnrollment=async(enrollmentId)=>{

  try {
    if(!window.confirm("Are you sure to delete this enrollment")) return ;
   const res= await axios.delete(`http://localhost:5000/instructor/enrollment/${enrollmentId}`,{withCredentials:true});
   if(res.data?.success){
    setIsDeleted(true);
   } 
  } catch (error) {
console.log(error.message)
  }
}
  return (
    <>  
    <Header/>
    <div className="md:mt-[66px] mt-[55px]">
 <Sidebar/>
    </div>
    <div className="p-6 bg-white md:ml-[250px] md:mt-[66px] mt-[55px]">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">My Students</h1>

      {/* Search Box */}
      <input
        type="text"
        onChange={(e)=>setSearchText(e.target.value)}
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

        
            {students.map((student, index) => (

               <tbody key={index}> 
                {student.filter((stu)=>(stu.studentId?.name.toLowerCase().includes(searchText.toLowerCase()))).map((item,index)=>(

        
                            <tr key={index} className="border-t hover:bg-gray-50">
                {/* Student Info */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={item.studentId?.avatar}
                    alt="student"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold">{item.studentId?.name}</p>
                </td>

                <td className="p-4 text-gray-600">{item.studentId?.email}</td>
                <td className="p-4">{item.courseId?.title}</td>
                <td className="p-4">{new Date(item.enrolledAt).toLocaleString('en-IN',{
                  dateStyle:"medium",
                  "timeStyle":"short"
                })}</td>

                {/* Status Badge */}
                <td className="p-4 flex gap-2">
               
                 
                                   <button onClick={()=>handleDeleteEnrollment(item._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                     <FiTrash2 />
                                   </button>
                                 </td>
              </tr>
                      ))}
            
  </tbody>
            ))}
        
        </table>
      </div>
       <EnrollmentGraph/>
    </div>
   
    </>
  );
};

export default Students;