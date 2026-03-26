import React, { useEffect, useState } from 'react'
import FormField from '../FormField'
import { MdClose } from "react-icons/md";
import axios from 'axios';

const EditUsers = ({setOpenEdit,userId,setAction}) => {
  const [user,setUser]=useState({
    photo:null,
    name:"",
    email:"",
    phone:"",
    bio:"",
    avatar:"",
    role:"",
    password:""
  })
const handleChange=(e)=>{
  setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
}
const [imagePreview,setImagePreview]=useState("");
useEffect(()=>{
if(user.photo){
setImagePreview(URL.createObjectURL(user.photo))
}
},[user.photo])

const handleGetUserData=async()=>{
  try {
    const res= await axios.get(`http://localhost:5000/admin/user/${userId}`,{withCredentials:true})
    setUser((prev)=>({...prev,...res.data?.data,password:""}));
  } catch (error) {
    console.log(error.message)
  }
}

useEffect(()=>{
 handleGetUserData();
},[userId])

const updateUserData=async(e)=>{
  e.preventDefault();
  try {
    const data= new FormData();
    Object.keys(user).forEach((d)=>{
      data.append(d,user[d]);
    })
    const res= await axios.put(`http://localhost:5000/admin/user/${userId}`,data,{withCredentials:true});
   if(res.data?.success){
    setAction({
      show:true,
      message:res.data?.message,
      type:"success"
    })
    setOpenEdit(false)
   }
  } catch (error) {
    console.log(error.message)
  }
}
  return (
    <div className=" zoom fixed top-0 min-h-screen  flex z-[60] justify-center items-center bg-black/90 overflow-y-auto w-full">
    <div className=" flex justify-center md:flex-row flex-col  relative justify-around w-full md:w-[80%] md:p-9 rounded-xl m-auto  bg-white">
         <div className="bg-white shadow-lg rounded-2xl  relative w-full max-w-md p-2 md:p-6">
        
        {/* Profile Image */}
        <div className="text-center  text-xl font-bold p-2">
          User Profile
        </div>
        <div className="flex flex-col items-center">
          <img
          
          src={imagePreview|| user.avatar}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />

          <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.bio||"Smart work" }</p>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-4">

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">+91{ user.phone||(" 00000 00000")}</span>
          </div>

          <div className="flex justify-between  pb-2">
            <span className="text-gray-500">Role</span>
            <span className="font-medium capitalize">{user.role || "student"}</span>
          </div>
        </div>
</div>

    
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <div className="text-center  text-xl font-bold p-2">
          Edit Profile
        </div>
        <form>
        <FormField 
        label="Profile Photo"
        onChange={(e)=>setUser((prev)=>({...prev,photo:e.target.files[0]}))}
        type={"file"}
        file={true}
        />
        <FormField 
        label="full Name"
        name="name"
        onChange={handleChange}
        value={user.name}
        type='text'
        />
        <FormField
        label="Email"
        name="email"
          value={user.email}
        onChange={handleChange}
        type="email"
        />
        <FormField
        label="Phone"
        name="phone"
          value={user.phone}
        onChange={handleChange}
        type="number"
        />
       <FormField 
       label ='Role'
       type="select"
         value={user.role}
      onChange={handleChange}
       name="role"
       select={true}
       options={[{label:'Student',value:"student"},
                  { label:"Instructor",value:"instructor"},
                  { label:"admin",value:"admin"}
       ]} />
       <FormField 
       label="Password"
       type='password'
         value={user.password}
      onChange={handleChange}
       name="password"
       />
       <div className="flex gap-3 p-4">
       <button onClick={updateUserData} className="bg-blue-500 border p-2 w-full rounded-lg text-white font-[600]">Save Changes</button>
       <button onClick={()=>setOpenEdit(false)} className="border font-[600] rounded-lg w-full">Cancel</button>
       </div>
        </form>
      </div>
      <button  onClick={()=>setOpenEdit(false)} className="absolute top-0 right-0 p-2 shadow bg-white rounded-full"><MdClose fontSize={30}/></button>
      </div>
    </div>
  
  )
}

export default EditUsers
