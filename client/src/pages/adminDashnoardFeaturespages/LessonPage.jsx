import React, { useState } from "react";
import Header from "../../components/home/Header";
import LessonSideBar from "../../components/AdminDashboard.jsx/LessonSideBar";
import LessonView from "../../components/AdminDashboard.jsx/LessonView";
import LessonNav from "../../components/AdminDashboard.jsx/LessonNav";


const LessonsPage = () => {
   const [open, setOpen] = useState(false);
   const [navData,setNavData]=useState({
    title:"",
    subTitle:"",
    lessonId:"",
   })
  
  return (
    <>
    <Header/>
    <LessonSideBar  open={open} setOpen={setOpen} />
    <div className=" md:ml-[300px] md:mt-[66px] mt-[55px]">
      <LessonNav setOpen={setOpen} navData={navData}  />
    <LessonView  setNavData={setNavData}/>
    </div>
    </>
  );
};

export default LessonsPage;