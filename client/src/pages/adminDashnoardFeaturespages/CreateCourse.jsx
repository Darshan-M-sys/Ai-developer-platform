import React from "react";
import FormField from "../../components/FormField";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard.jsx/AdminSidebar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ActionDisplay from "../../components/ActionDisplay";
import { useLocation, useNavigate } from "react-router-dom";


const CreateCourse = () => {
  const [isUpdate,setIsUpdate]=useState(false);
  const [action,setAction]=useState({
    show:false,
    message:"",
    type:''
  })
  const nav=useNavigate()
  const [instructors,setInstructors]=useState([]);
  const [formData,setFormData]=useState({
    title:'',
    price:"",
    duration:"",
    instructor:null,
    category:'',
    level:'',
    description:"",
    youWillLearn:"",
    image:null,
    thumbnail:""
  })

  const {state}=useLocation();
  
   const handleGetCourseData=async()=>{
      try {
        if(state){
        const res= await axios.get(`http://localhost:5000/admin/course/${state}`,{withCredentials:true});
         setFormData((prev)=>({...prev,...res.data?.data,instructor:res.data?.data?.instructor?._id}))
         setIsUpdate(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  
 const handleUpdateCourse=async(e)=>{
    e.preventDefault()

    try {
      const data= new FormData();
      Object.keys(formData).forEach((d)=>{
        data.append(d,formData[d]);
      })
      console.log(formData)
      const res= await axios.put(`http://localhost:5000/admin/course/${state}`,data,{withCredentials:true});
       if(res.data?.success){
        setAction({
          show:true,
          message:res.data?.message,
          type:'success'
        })
        nav("/admin/courses");
       }
    } catch (error) {
      console.log(error.message)
    }
  } 
    useEffect(()=>{
handleGetCourseData();
    },[state])
  const [imagePreview,setImagePreview]=useState(null);
  const handleChange=(e)=>{
setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  
  useEffect(()=>{
    if(formData.image){
      setImagePreview(URL.createObjectURL(formData.image))
    }
  },[formData.image]);
  const handleGetInstructors=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/admin/instructors",{withCredentials:true});
      setInstructors(res.data?.data || [])
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
   handleGetInstructors();
  },[])
  const handleCreateCourse=async(e)=>{
    e.preventDefault()

    try {
      const data= new FormData();
      Object.keys(formData).forEach((d)=>{
        data.append(d,formData[d]);
      })
      const res= await axios.post("http://localhost:5000/admin/course",data,{withCredentials:true});
       if(res.data?.success){
        setAction({
          show:true,
          message:res.data?.message,
          type:'success'
        })
        nav("/admin/courses");
       }
    } catch (error) {
      console.log(error.message)
    }
  }
 
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
    <AdminSidebar/>
    <div className=" md:ml-[280px] min-h-screen md:mt-[66px] bg-gray-50 mt-[55px] flex justify-center items-start p-1 md:p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Create New Course
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill the course details below to publish a new course for students
          </p>
        </div>

        {/* Form */}
        <form onSubmit={isUpdate?handleUpdateCourse:handleCreateCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Title */}
          <FormField
            label="Course Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
             required={true}
          />

          {/* Instructor Name */}
          <FormField
            label="Select Instructor"
            name="instructor"
            select={ true}
            onChange={handleChange}
            options={instructors.map((item)=>{
              return(
                {
              label:item.instructor?.name,value:item.instructor?._id
                }
              )
            })}
            
            type="text"
        
            required={isUpdate?false:true}
          />

          {/* Category */}
         <FormField
  label="Category"
  name="category"
  select={true}
  value={formData.category}
  onChange={handleChange}
  type="select"
  options={[
    {label:"Web Development" ,value:" Web Development"},
    {label:"AI / Machine Learning" ,value:" AI / Machine Learning"},
    {label:"Python Programming" ,value:" Python Programming"},
    {label:"Data Science" ,value:" Data Science"},
    {label:"UI/UX Design" ,value:" UI/UX Design"},
    {label:"Mobile App Development" ,value:" Mobile App Development"},
    {label:"Cyber Security" ,value:" Cyber Security"},
    {label:"Cloud Computing" ,value:" Cloud Computing"},
    {label:"DevOps" ,value:"DevOps"}
  ]}
   required={true}
/>

          {/* Price */}
          <FormField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="Enter course price"
             required={true}
          />

          {/* Level */}
          <FormField
            label="Level"
            name="level"
            type="select"
            select={true}
            options={[
              {
                label:"Beginner", value:"Beginner"
              },
              {
                  label:"Intermediate", value:"Intermediate"
              },
              {
                  label:"Advanced", value:"Advanced"
              }
            ]}
            value={formData.level}
            onChange={handleChange}
          required={true}
          />

          {/* Duration */}
          <FormField
            label="Duration"
            name="duration"
            type="text"
             value={formData.duration}
            onChange={handleChange}
             required={true}
          />

          {/* Thumbnail */}
          <FormField
            label="Course Thumbnail"
            name="image"
            type="file"
            onChange={(e)=>setFormData((prev)=>({...prev,image:e.target.files[0]}))}
            file={true}
             required={true}
          />
          {
            (formData.thumbnail ||  imagePreview )&&(
              <img src={imagePreview || formData.thumbnail} className="w-[100px] h-[100px] rounded-full" alt="thumbnail" />
            )
          }
       
          {/* Description */}
          <div className="md:col-span-2">
            <FormField
              label="Course Description"
              name="description"
               value={formData.description}
            onChange={handleChange}
              type="textarea"
              textarea={true}
               required={true}
         
            />
          </div>

          {/* What You Will Learn */}
          <div className="md:col-span-2">
            <FormField
              label="What You Will Learn"
              name="youWillLearn"
              type="textarea"
               textarea={true}
             value={formData.youWillLearn}
            onChange={handleChange}
             required={true}
            />
          </div>

        

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end pt-4">
            <button className="bg-black text-white px-8 py-3 rounded-xl text-sm md:text-base font-medium hover:bg-gray-900 transition">
              {isUpdate?"Save Changes":"Create Course"}
            </button>
          </div>
        </form>
      </div>

    </div>
    </>
  );
};

export default CreateCourse;
