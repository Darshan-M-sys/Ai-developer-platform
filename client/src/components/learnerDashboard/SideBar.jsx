import React, { useState } from "react";
// icons components
import { IoClose } from "react-icons/io5";
// 

const Sidebar = ({setMenuShow}) => {

  return (

    <div className=" md:block w-64 fixed top-0 bg-black  mt-[64px] md:mt-[66px] z-[10] text-white min-h-screen p-6">
 <div className="flex items-center justify-between  relative md:hidden">      
  <h1 className="text-2xl font-bold mb-8">
        DevLearn AI 
      </h1>
      <span onClick={()=>setMenuShow(false)} className="text-2xl absolute top-0 right-0 bg-blue-500  p-2 rounded-full text-white  font-bold"><IoClose/></span>
      </div>
         
  <h1 className="text-2xl hidden md:block font-bold mb-8">
        DevLearn AI 
      </h1>
      


      <ul className="space-y-4">
       
        <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-400 cursor-pointer">Courses</li>
        <li className="hover:text-blue-400 cursor-pointer">Playground</li>
        <li className="hover:text-blue-400 cursor-pointer">Practice</li>
        <li className="hover:text-blue-400 cursor-pointer">Projects</li>
        <li className="hover:text-blue-400 cursor-pointer">Certificates</li>

      </ul>

    </div>

  );
};

export default Sidebar;