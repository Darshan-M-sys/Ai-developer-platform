import React from 'react'
import Header from '../../components/home/Header'

import LearningScreenSidebar from '../../components/learnerDashboard/LearningScreenSidebar';
import LearningScreenNav from '../../components/learnerDashboard/LearningScreenNav';
import VideoPlayer from '../../components/learnerDashboard/VideoPlayer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const LearningScreenPage = () => {
  const [currentLessonId, setCurrentLessonId] = React.useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
const [lessons, setLessons] = React.useState([]);
const [lesson, setLesson] = React.useState({});

const currentLessonIndex = lessons.findIndex(l => l._id === lesson._id);
const totalLessons = lessons.length;

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = lessons[currentLessonIndex - 1];
      window.location.href = `/learner/course/${prevLesson.courseId?._id}/lesson/${prevLesson._id}`;
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < totalLessons - 1) {
      const nextLesson = lessons[currentLessonIndex + 1];
      window.location.href = `/learner/course/${nextLesson.courseId?._id}/lesson/${nextLesson._id}`;
    }
  };

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
      <LearningScreenNav lessons={lessons} lesson={lesson} handlePrev={handlePrev} handleNext={handleNext} setIsSidebarOpen={setIsSidebarOpen} />
      <VideoPlayer lessonId={lessonId} courseId={courseId} setLesson={setLesson} lessons={lessons}/>
      
    
      </div>
      </div>
    <div>
    </div>
    </>
  )
}

export default LearningScreenPage
