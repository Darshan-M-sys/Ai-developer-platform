import React, { useState } from "react";
import Header from "../../components/home/Header";
import LessonSidebar from "../../components/InstructorDashbaord/LessonSidebar";
import LessonNav from "../../components/InstructorDashbaord/LessonNav";
import LessonView from "../../components/InstructorDashbaord/LessonView";
const LessonsMainPage = () => {
   const [open, setOpen] = useState(false);
   const [navData,setNavData]=useState({
    title:"",
    subTitle:"",
    lessonId:"",
    courseId:"",
   })
  const [firstLessonId,setFirstLessonId]=useState(null)
  return (
    <>
    <Header/>
    <LessonSidebar  setFirstLessonId={setFirstLessonId} open={open} setOpen={setOpen} />
    <div className=" md:ml-[300px] md:mt-[66px] mt-[55px]">
      <LessonNav firstLessonId={firstLessonId} setOpen={setOpen} navData={navData}  />
    <LessonView  setNavData={setNavData}/>
    </div>
    </>
  );
};

export default LessonsMainPage;