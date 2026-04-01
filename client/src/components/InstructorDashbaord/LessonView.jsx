import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import {useParams} from "react-router-dom";

const LessonView = ({setNavData}) => {
  const [lesson,setLesson]=useState({})

  const {courseId,lessonId}=useParams();
  const handleLesson = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/instructor/lessons/${courseId}/${lessonId}`,
        { withCredentials: true }
      );
      setNavData({
        title:res.data?.data?.title,
        subTitle:res.data?.data?.subDescription,
        lessonId:res.data?.data?._id,
        courseId:res.data?.data?.courseId
      })
      setLesson(res.data?.data|| {})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(lessonId){
      handleLesson();
    }
  },[lessonId])
  
  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">

      {/* Title */}
     

      {/* Video Section */}
      <div className="bg-black rounded-xl overflow-hidden mb-8">
        <video
          controls
          className="w-full  h-full object-cover"
          src={lesson.videoUrl}
        />
      </div>
 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
          <p><span className="font-medium">Course:</span> {lesson.courseId?.title}</p>
          <p><span className="font-medium">Instructor:</span> {lesson.instructor?.instructor?.name}</p>
          <p><span className="font-medium">Duration:</span> {lesson.duration}</p>
        </div>
      {/* Description in Markdown */}
      <div className="bg-white rounded-xl shadow-sm md:p-6">


        <h2 className="text-xl font-semibold mb-4">Lesson Description</h2>

        <div className="prose max-w-none">
          <ReactMarkdown>
            {lesson.description}
          </ReactMarkdown>
        </div>

      </div>

    </div>
  );
};

export default LessonView;