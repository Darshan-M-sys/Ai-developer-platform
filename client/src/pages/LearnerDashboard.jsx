import React, { useState } from "react";
// icons components
import { TfiMenu } from "react-icons/tfi";
// 

import Navbar from "../components/learnerDashboard/Navbar";
import WelcomeCard from "../components/learnerDashboard/WelcomeCard";
import StatsCards from "../components/learnerDashboard/StatsCards";
import CourseCard from "../components/learnerDashboard/CourseCard";
import PlaygroundCard from "../components/learnerDashboard/PlaygroundCard";
import DailyChallenge from "../components/learnerDashboard/DailyChallenge";
import RecentActivity from "../components/learnerDashboard/RecentActivity";
import Sidebar from "../components/learnerDashboard/SideBar";
import Header from "../components/home/Header";
const LearnerDashboard = () => {
  const [menuShow,setMenuShow]=useState(false);
  const [profileData,setProfileData]=useState({})
  return (
    <>
    <Header setProfileData={setProfileData}/>
    <div className="flex bg-gray-100 mt-[66px] min-h-screen">
     <div className="hidden md:block">
      <Sidebar />
     </div>
     <div onClick={()=>setMenuShow(!menuShow)} className={`text-xl md:hidden fixed top-20  z-[30] bg-blue-500 p-2 rounded-full text-white`}>
      <TfiMenu/>
     </div>
  <div
  className={`fixed top-0 z-30 transition-all duration-300 
  ${menuShow ? "left-0" : "-left-64"}`}
>
  <Sidebar setMenuShow={setMenuShow} />
</div>
      <div className="flex-1 md:ml-[250px] p-4 md:p-6 space-y-6">

        <Navbar profileData={profileData} />

        <WelcomeCard />

        <StatsCards />

        <div>

          <h2 className="text-xl font-bold mb-4">
            Continue Learning
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <CourseCard />
            <CourseCard />
            <CourseCard />

          </div>

        </div>

        <PlaygroundCard />

        <DailyChallenge />

        <RecentActivity />

      </div>

    </div>
</>
  );

};

export default LearnerDashboard;