import React from "react";
import { IoClose } from "react-icons/io5";
import {
  LayoutDashboard,
  BookOpen,
  Code,
  Brain,
  FolderKanban,
  Award,
  LogOut
} from "lucide-react";


import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../home/Header";
import axios from "axios";
import { FaAirFreshener } from "react-icons/fa";

const Sidebar = ({ menuShow, setMenuShow }) => {
  const path=useLocation();
  const nav= useNavigate();
  const handleLogout=async()=>{
    try {
     const res= await axios.get("http://localhost:5000/api/auth/logout",{withCredentials:true});
     if(res.success){
       nav("/")
     } 
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>

  
      {/* Overlay for mobile */}
      {menuShow && (
        <div
          onClick={() => setMenuShow(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-screen w-64 bg-[#0f172a] text-white shadow-xl z-30 
        transform transition-transform duration-300
        ${menuShow ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >

        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 md:hidden">
          <h1 className="text-xl font-bold text-blue-400">DevLearn AI</h1>
          <button
            onClick={() => setMenuShow(false)}
            className="text-white text-2xl bg-blue-500 p-1 rounded-full"
          >
            <IoClose />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-blue-400">DevForge AI</h1>
          <p className="text-sm text-gray-400 mt-1">Student Dashboard</p>
        </div>

        {/* Menu */}
        <ul className="flex flex-col justify-between h-[70%] px-4 py-6 overflow-y-auto">


       
             <Link to="/dashboard"> <li className={` ${path.pathname==="/dashboard"?"bg-blue-500":""} flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 mb-2 transition`}>
              <LayoutDashboard size={20} />
              <span className="text-lg">Dashboard</span>
            </li></Link>

           <Link to="/learner/courses"> <li className={` ${path.pathname==="/learner/courses"?"bg-blue-500":""} flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition`}>
              <BookOpen size={20} />
              <span className="text-lg">My Courses</span>
            </li>
</Link>
             <Link to="/playground">  <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition">
              <Code size={20} />
              <span className="text-lg">Playground</span>
            </li></Link>

      <Link to="/ai/chat">   <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition">
              <FaAirFreshener size={20} />
              <span className="text-lg">AI Chat</span>
            </li>
   </Link> 
            <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition">
              <FolderKanban size={20} />
              <span className="text-lg">Next Course</span>
            </li>

        <Link to='/learner/certificate'>    <li className={`flex  ${path.pathname==="/learner/certificate"?"bg-blue-500":""} items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition`}>
              <Award size={20} />
              <span className="text-lg">Certificates</span>
            </li></Link>



          {/* Logout */}
          <li onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 transition">
            <LogOut size={20} />
            <span className="text-lg">Logout</span>
          </li>

        </ul>
      </div>
    </>
  );
};

export default Sidebar;