import React from 'react'
import Header from '../../components/home/Header'

import LearningScreenSidebar from '../../components/learnerDashboard/LearningScreenSidebar';
import { MenuIcon } from 'lucide-react';
import LearningScreenNav from '../../components/learnerDashboard/LearningScreenNav';
import VideoPlayer from '../../components/learnerDashboard/VideoPlayer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const LearningScreenPage = () => {
  const [currentLessonId, setCurrentLessonId] = React.useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
const [lessons, setLessons] = React.useState([]);


  const {lessonId, courseId}=useParams();


  const getAllLessons=async()=>{
    try {
      const res= await axios.get(`http://localhost:5000/student/lessons/all/${courseId}`,{withCredentials:true});
      setLessons(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(()=>{ 
    getAllLessons();
  },[courseId]);

  


  return (
    <>
    <Header/>
     <LearningScreenSidebar
        lessons={lessons}
        courseId={courseId}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentLessonId={currentLessonId}
        onSelectLesson={setCurrentLessonId}
      />
    <div className="md:mt-[60px] mt-[55px]  md:ml-[280px] min-h-screen bg-gray-100 p-2 md:p-4">
     
      <div>
      <LearningScreenNav setIsSidebarOpen={setIsSidebarOpen} />
      <VideoPlayer lessonId={lessonId} courseId={courseId} />
      
    
      </div>
      </div>
    <div>
    </div>
    </>
  )
}

export default LearningScreenPage
