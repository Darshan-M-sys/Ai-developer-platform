import React, { useEffect, useState } from "react";
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
import axios from "axios";
import ProgressBarChart from "./LearnerDashboardPages/ProgressBarChart";

const LearnerDashboard = () => {
  const [menuShow,setMenuShow]=useState(false);
  const [profileData,setProfileData]=useState({})
  const [statsData,setStatsData]=useState({});
  const [enrolledCourses,setEnrolledCourses]=useState([]);
  const handleGetStatsData=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/student/stats",{withCredentials:true});
      setStatsData(res.data?.data || {})
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
handleGetStatsData()
  },[])
  const handleGetEnrolledCourses=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/student/enrollment/all",{withCredentials:true});
      // console.log(res.data)
      setEnrolledCourses(res.data?.data || [])
      // console.log(res.data?.data || [])
    
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
handleGetEnrolledCourses()
  },[])

const [progressData, setProgressData] = useState([]);

useEffect(() => {
  const formattedData = enrolledCourses.map((data, index) => {
    
    const lessons = data.lessonData.map((l) => {
      const lessonPresent = data.progressData?.lessonProgress?.find(
        (ld) => ld.lessonId === l._id
      );

      return {
        _id: l._id,
        title: l.title,
        progress: lessonPresent ? lessonPresent.progress : 0,
      };
    });

    return {
      courseId: {
        _id: data?.enrollmentCourses?.courseId?._id || index,
        title: data?.enrollmentCourses?.courseId?.title || "",
        totalProgress:data?.progressData?.courseCompletion
      },
      lessons: lessons,
    };
  });

  setProgressData(formattedData);

}, [enrolledCourses]);


const [welcomeCourse,setWelcomeCourse]=useState({});
useEffect(() => {
  if (enrolledCourses.length > 0) {
    const courseWithProgress = enrolledCourses.find(
      (course) => course.progressData?.courseCompletion > 0 && course.progressData?.courseCompletion <= 100
    );
    setWelcomeCourse(courseWithProgress || {});
  }

}, [enrolledCourses,enrolledCourses.length]);



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

      {welcomeCourse?.enrollmentCourses?.courseId?.title && ( <WelcomeCard  welcomeCourse={welcomeCourse} username={profileData?.name} />)}

        <StatsCards statsData={statsData} />
{progressData.length>0 && (        <div className=" bg-gray-200 shadow-lg rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Continue Learning
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          
           {progressData.map((getCourseProgress,index)=>{
              return(
                <div>
   <ProgressBarChart getCourseProgress={getCourseProgress} />
                </div>
              )
           })}
           
          
          </div>

        </div>
        )}


        <PlaygroundCard />

        <DailyChallenge />

        <RecentActivity />

      </div>

    </div>
</>
  );

};

export default LearnerDashboard;