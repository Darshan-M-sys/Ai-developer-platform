import React, { useState } from "react";
import Header from "../../components/home/Header";
import LessonSideBar from "../../components/AdminDashboard.jsx/LessonSideBar";
import LessonView from "../../components/AdminDashboard.jsx/LessonView";
import LessonNav from "../../components/AdminDashboard.jsx/LessonNav";

const LessonsPage = () => {
   const [open, setOpen] = useState(false);
  const lessons = [
    { _id: 1, title: "Introduction to Python", duration: "10 min" },
    { _id: 2, title: "Variables in Python", duration: "12 min" },
    { _id: 3, title: "If Else Statements", duration: "15 min" },
  ];
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);

  return (
    <>
    <Header/>
    <LessonSideBar lessons={lessons} open={open} setOpen={setOpen} />

    <div className=" md:ml-[300px] md:mt-[66px] mt-[55px]">
      <LessonNav setOpen={setOpen} />
    <LessonView/>
    </div>
    </>
  );
};

export default LessonsPage;