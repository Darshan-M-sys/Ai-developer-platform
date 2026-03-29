import React from 'react'
import Header from '../../components/home/Header'

import LearningScreenSidebar from '../../components/learnerDashboard/LearningScreenSidebar';
import { MenuIcon } from 'lucide-react';
import LearningScreenNav from '../../components/learnerDashboard/LearningScreenNav';
import VideoPlayer from '../../components/learnerDashboard/VideoPlayer';

const LearningScreenPage = () => {
  const [currentLessonId, setCurrentLessonId] = React.useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const lessons = [
    { _id: "1", title: "Introduction to Python", duration: "5 min" },
    { _id: "2", title: "Installing Python", duration: "7 min" },
    { _id: "3", title: "Variables in Python", duration: "10 min" },
    { _id: "4", title: "Data Types", duration: "12 min" },
  ];

  return (
    <>
    <Header/>
     <LearningScreenSidebar
        lessons={lessons}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentLessonId={currentLessonId}
        onSelectLesson={setCurrentLessonId}
      />
    <div className="md:mt-[60px] mt-[55px]  md:ml-[280px] min-h-screen bg-gray-100 p-2 md:p-4">
     
      <div>
      <LearningScreenNav setIsSidebarOpen={setIsSidebarOpen} />
      <VideoPlayer/>
      
    
      </div>
      </div>
    <div>
    </div>
    </>
  )
}

export default LearningScreenPage
