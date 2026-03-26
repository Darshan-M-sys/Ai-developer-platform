import React, { useState } from "react";

import VideoPlayer from "../components/coursePlayer/VideoPlayer";
import Sidebar from "../components/coursePlayer/Sidebar";
import Navbar from "../components/coursePlayer/Navbar"
import { FiMenu } from "react-icons/fi";
import ExplainWithAi from "../components/coursePlayer/ExplainWithAi";
import AIQuiz from "../components/coursePlayer/AiQuiz";

const lessonsData = [
  {
    id: 1,
    title: "Introduction",
    duration: "2:30",
    video: "/videos/intro.mp4",
    completed: true,
  },
  {
    id: 2,
    title: "React Basics",
    duration: "10:20",
    video: "/videos/react.mp4",
    completed: false,
  },
  {
    id: 3,
    title: "Hooks",
    duration: "8:15",
    video: "/videos/hooks.mp4",
    completed: false,
  },
];

const CoursePlayer = () => {
  const [menu,setMenu]=useState(false)
  const [lessons, setLessons] = useState(lessonsData);
  const [currentLesson, setCurrentLesson] = useState(lessonsData[0]);

  return (
    <div className="flex">
    
      {/* Sidebar */}
      <div className="hidden  md:block">
      <Sidebar
        lessons={lessons}
        currentLesson={currentLesson}
        setCurrentLesson={setCurrentLesson}
      />
</div>
{/* mobile menu */}
<div onClick={()=>setMenu(!menu)} className="fixed md:hidden top-2 text-xl left-3">
  <FiMenu/>
</div>
    <div className={`block fixed top-0 z-40  transition-all duration-300 md:hidden ${!menu?"left-[-275px]":"left-[0px] "}`}>
      <Sidebar
        lessons={lessons}
        currentLesson={currentLesson}
        setCurrentLesson={setCurrentLesson}
        setMenu={setMenu}
      />
</div>
      {/* Video Section */}
      <div className="flex-1 md:p-4 p-2">
          {/* Nav bar */}
      <Navbar/>
      <VideoPlayer lessonName={currentLesson.title} />
      <ExplainWithAi/>
      <AIQuiz/>
      </div>
    </div>
  );
};

export default CoursePlayer;