import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {Link, useNavigate, useParams} from "react-router-dom"

const LessonSideBar = ({  open,setOpen, }) => {
const [lessons,setLessons]=useState([]);
  const {courseId}=useParams();
  
  const {id}=useParams();
const [lessonId,setLessonId]=useState(id)
const handleLesson = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/admin/lessons/${courseId}`,
      { withCredentials: true }
    );
   setLessons(res.data?.data || [])
  } catch (error) {
    console.log(error);
  }
};
useEffect(()=>{
  if(courseId){
    handleLesson();
  }
},[]);


const navigate=useNavigate();
const handleGo=(id)=>{
 setLessonId(id)
navigate(`/admin/lesson/${courseId}/${id}`);
}


return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed  top-[72px]   left-0 h-screen bg-white border-r flex flex-col
        w-72 sm:w-80 md:w-80
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-5 border-b flex  justify-between gap-9  items-center">
          
          <h2 className="text-lg md:text-2xl font-semibold">Lessons</h2>
          {/* Close Button (mobile only) */}
         
           <Link to={`/admin/lesson/add/${courseId}`} className="w-[70%] m-auto  text-center bg-black text-white py-2 rounded-lg">
            Add Lesson
         </Link>
           <button
            onClick={() => setOpen(false)}
            className="md:hidden text-xl"
          >
            <MdClose/>
          </button>
        </div>
      

        {/* Lesson List */}
        <div  className="flex-1 overflow-y-auto p-4">
          {lessons.map((lesson) => (
            <div 

              key={lesson._id}
              onClick={() => (
                setOpen(false),handleGo(lesson._id)// close sidebar on mobile
          )}
              className={`p-4 mb-3 rounded-lg cursor-pointer border transition-all
              ${
              lessonId===lesson._id
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <Link to={`/admin/lesson/${courseId}/${lessonId}`}>
              <h3 className="font-medium text-sm md:text-base">
                {lesson.title}
              </h3>
              </Link>
 <Link to={`/admin/lesson/${courseId}/${lessonId}`}>
              <p
                className={`text-xs md:text-sm ${
                  lessonId === lesson._id
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {lesson.duration}
              </p>
              </Link>
            </div>
          ))}
        </div>

        {/* Add Lesson Button */}
    
      </div>
    </>
  );
};

export default LessonSideBar;