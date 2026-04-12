import React, { useState } from "react";
import Navbar from "../components/problemSloving/Nav";
import Sidebar from "../components/problemSloving/Sidebar";
import ProblemDetails from "../components/problemSloving/ProblemDetails";
import CodeEditor from "../components/problemSloving/CodeEditor";
import TestcasePanel from "../components/problemSloving/TestCasePanel";
import AiTips from "../components/problemSloving/AiTips";
import { TfiMenu } from "react-icons/tfi";

const ProblemPage = () => {
  const [menu,setMenu]=useState(false);
  return (
    <div className="h-screen flex flex-col min-h-[200vh]">
 
      {/* Navbar */}
       <Navbar/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-1/5  border-r overflow-y-auto">
          <Sidebar />
        </div>
        <div onClick={()=>setMenu(!menu)} className="fixed top-10 p-2 md:hidden rounded-full bg-white shadow text-xl">
          <TfiMenu/>
        </div>
          {/* <div className={`w-1/5  fixed top-0 transition-all duration-300 z-40 bg-white ${menu?"left-0":"left-[-327px]"} w-full h-full border-r overflow-y-auto`}>
          <Sidebar  setMenu={setMenu}/>
        </div> */}
        {/* Problem + Editor */}
        <div className="flex flex-col w-full md:w-4/5">

          {/* Top Section */}
          <div className="flex md:flex-row flex-col  ">

            {/* Problem Description */}
            <div className="md:w-1/2 w-full border-r ">
              <ProblemDetails />
            </div>

            {/* Code Editor */}
            <h1 className="text-sm md:hidden p-2 underline font-semibold text-black"> Write Code Here</h1>
            <div className="md:w-1/2 md:h-full h-[300px]  bg-blue-500 w-full">
              <CodeEditor />
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="flex h-full md:flex-row flex-col w-full overflow-x-auto">
          <div className="h-1/3  md:w-1/2 w-[320px]   border-t">
            <TestcasePanel />
          </div>
          <div className="md:w-1/2  md:block w-[320px] ">
            <AiTips/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;