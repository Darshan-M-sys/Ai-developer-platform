import axios from "axios";
import React from "react";
import { MdMenu } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const LessonNav = ({ navData, onEdit,setOpen,open }) => {

const deleteLesson=async()=>{
try {
    if(!window.confirm("Are you sure to delete this lesson")) return;
    const res= await axios.delete(`http://localhost:5000/admin/lesson/${navData.lessonId}`,{withCredentials:true});
    if(res.data?.success){
     window.location.reload();
    }
  } catch (error) {
    console.log(error)
  }
}
const {courseId}=useParams()
 return (
    <div className="bg-white border-b p-4 md:p-6 ml-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Left Side */}
      <div >
        <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold">{navData.title}</h2>
    <p onClick={()=>setOpen(!open)} className="text-xl md:hidden p-2 rounded-full shadow-xl bg-white ">
    <MdMenu fontSize={28}/>
       </p>
       </div>
          <h2 className="hidden md:block md:text-sm font-semibold text-gray-500 ">{navData.subTitle}</h2>
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-3">
    {navData.lessonId && (
       <Link to={`/admin/lesson/add/${courseId}`} state={navData.lessonId}> <button
          onClick={onEdit}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Edit Lesson
        </button></Link>)}

        <button
          onClick={deleteLesson}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete Lesson
        </button>

      </div>

    </div>
  );
};

export default LessonNav;