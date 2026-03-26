import React, { useEffect, useRef, useState } from "react";
import Header from "../components/home/Header";
import FormField from "../components/FormField";
import ActionDisplay from "../components/ActionDisplay"
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const[action,setAction]=useState({
    message:"",
    show:false,
    type:""
  })
  const nav= useNavigate();
  const fileRef=useRef(null)
  const [show,setShow]=useState("profile");
  const [formData,setFormData]=useState({
    name:"",
    phone:"",
    bio:"",
    image:null,
  })
  const [image,setImage]=useState(null)
  const [imagePreview,setImagePreview]=useState("")
  
  useEffect(()=>{
    if(image){
      setFormData((prev)=>({...prev,image:image}))
      setImagePreview(URL.createObjectURL(image))
    }
  },[image])
  const handleChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]: e.target.value}))
  }
  const [user,setUser]=useState({})
  const authData=async()=>{
    try {
       const res= await axios.get("http://localhost:5000/api/auth/me",{withCredentials:true})
       setUser(res.data?.data || {})
       setFormData((prev)=>({...prev,...res.data?.data}))
    } catch (error) {
     console.log(error) 
    }
  }

  useEffect(()=>{
    if(!user.email){
      const timeout=setTimeout(()=>{
      nav("/login")
      },100)
      return()=>{
        clearTimeout(timeout)
      }
    }
  },[user])

  useEffect(()=>{
authData();
  },[show])

  const handleUpdate=async()=>{
     try {
      const data= new FormData();
      Object.keys(formData).forEach((p)=>{
        data.append(p,formData[p])
      })
       const res=  await axios.put('http://localhost:5000/api/auth/update',data,{withCredentials:true});
       if(res.data.success){
         setAction(()=>({
            show:true,
            message:res.data?.message,
            type:"success"
       }))
       setShow("profile")
       }
     } catch (error) {
       setAction(()=>({
            show:true,
            message:"Internal Server Error",
            type:"error"
       }))
     }
  }

const handleLogout=async()=>{
  try {
     const res=await axios.get("http://localhost:5000/api/auth/logout",{withCredentials:true});
     if(res.data.success){
     nav("/") }
  } catch (error) {
    console.log(error)
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
   {show==="profile" && (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />

          <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.bio}</p>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-4">

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">+91{user.phone || (" 00000 00000")}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Role</span>
            <span className="font-medium capitalize">{user.role}</span>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button onClick={()=>setShow("profileEdit")} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>

          <button onClick={handleLogout}  className="w-full border border-gray-300 py-2 rounded-lg hover:bg-red-500 transition">
            Logout
          </button>
        </div>

      </div>


    </div>)
}
{
  show === "profileEdit" && (
    <div className=" flex-col min-h-screen justify-center items-center flex ">
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full mx-auto">

      <h2 className="text-xl font-bold mb-5 text-center">Edit Profile</h2>

      <div className="space-y-4">
        <div className="flex relative justify-center items-center">       <img
            src={ imagePreview || user.avatar}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />
          <span onClick={()=>fileRef.current.click()} className=" bg-black/50 text-white  shadow p-2 rounded-full absolute top-10  text-xl left-[60%]"> <FaPen/></span>
          </div>
         <input ref={fileRef} type="file" style={{display:"none"}} onChange={(e)=>setImage(e.target.files[0])} />
        <FormField
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormField
          label="Phone Number"
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <FormField
          label="Bio"
          type="text"
          name="bio"
          placeholder="Enter your role"
          value={formData.bio}
          onChange={handleChange}
        />
       
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleUpdate}
        >
          Save Changes
        </button>

        <button
          className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setShow("profile")}
        >
          Cancel
        </button>
      </div>
    </div>
    </div>
  )
}

    </>
  );
};

export default Profile;