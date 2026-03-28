import React, { useEffect, useState } from "react";
import FormField from "../../components/FormField";
import Header from "../../components/home/Header";
import LessonSideBar from "../../components/AdminDashboard.jsx/LessonSideBar";
import { MdMenu } from "react-icons/md";
import {Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ActionDisplay from "../../components/ActionDisplay";
const AddLessonPage = () => {
  const {courseId}=useParams()
  const [action,setAction]=useState({
    show:false,
    message:"",
    type:""
  });
const {state}=useLocation();
const[open,setOpen]=useState(false);
const [update,setUpdate]=useState(false);
const [formData, setFormData] = useState({
    title: "",
    subDescription:"",
    percentage:"",       
    duration: "",
    video: null,
    videoUrl:"",
    description: "",});
const handleLesson = async () => {
      try {
  const res = await axios.get(
          `http://localhost:5000/admin/lesson/${state}`,
          { withCredentials: true }
        );
      setFormData((prev)=>({...prev,...res.data?.data}));
      setUpdate(true);
      } catch (error) {
        console.log(error);
      }
    };

useEffect(()=>{
      if(state){
        handleLesson();
      }
    },[state]);

const [loading,setLoading]=useState(false)
  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, video: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

 
const nav= useNavigate()
const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
   try {
    const data= new  FormData();
    Object.keys(formData).forEach((key)=>{
      data.append(key,formData[key])
    });
    const  res= await axios.post(`http://localhost:5000/admin/lesson/create/${courseId}`,data,{withCredentials:true});
    console.log(res.data)
   if (res.data?.success){
    setAction({
      show:true,
      message:res.data?.message,
      type:"success"
    });
    setLoading(false);
    nav(`/admin/lesson/${courseId}/${res.data?.data?._id}`);
   }
   } catch (error) {
    console.log(error)
   }
  };


const updateSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
   try {
    const data= new  FormData();
    Object.keys(formData).forEach((key)=>{
      data.append(key,formData[key])
    });
    const  res= await axios.put(`http://localhost:5000/admin/lesson/${state}`,data,{withCredentials:true});
   if (res.data?.success){
    setAction({
      show:true,
      message:res.data?.message,
      type:"success"
    });
    setLoading(false);
    nav(`/admin/lesson/${courseId}/${res.data?.data?._id}`);
   }
   } catch (error) {
    console.log(error)
   }
  };


return (
    <>
 {action.show && (
  <ActionDisplay
    message={action.message}
    type={action.type}
    onClose={() => setAction((prev) => ({ ...prev, show: false }))}
  />
)}
    <Header/>
    <LessonSideBar lessons={[]} open={open} setOpen={setOpen}/>
    <div className=" md:mt-[66px] md:ml-[300px] mt-[60px] p-2 md:p-10 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl   font-semibold ">
        Add New Lesson
      </h1>
      <p onClick={()=>setOpen(!open)} className="p-2  md:hidden bg-white shadow-xl rounded-full"><MdMenu fontSize={28}/></p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-1 md:p-8 max-w-3xl">

        <form onSubmit={update?updateSubmit:handleSubmit} className="space-y-5">
          {/* Lesson Title */}
          <FormField
            label="Lesson Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required={true}
          />

          {/* Course Title */}
          <FormField
            label="Sub  title ( max 100 char)"
            name="subDescription"
            value={formData.subDescription}
            onChange={handleChange}
             required={true}
          />
          {/* Duration */}
          <FormField
            label="Lesson Duration (Example: 10 min)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
             required={true}
          />
          <FormField
            label="Percentage of Lesson (Example: 2%)"
            name="percentage"
            type="number"
            maxValue={true}
            max={100}
            value={formData.percentage}
            onChange={handleChange}
             required={true}
          />
          {/* Video Upload */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Upload Lesson Video</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              className="border rounded-lg p-3"
              required={update?false:true}
            />
            {formData.videoUrl &&
            (
              <Link to={formData.videoUrl} className="text-blue-500 font-[600]">Click here...</Link>
            )}
          </div>

          {/* Description (Markdown) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Lesson Description (Markdown Supported)
            </label>
            <textarea
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none"
              placeholder="Write lesson description using markdown..."
               required={true}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-2 items-center justify-start">
            <button className="bg-black w-[200px] text-white px-6 py-2 rounded-lg">
             {!update?(loading?"Adding":"Add Lesson"):(loading?"Updating":"Update")} 
              </button>
            <button className="bg-white  w-[200px] text-black border px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
  );
};

export default AddLessonPage;