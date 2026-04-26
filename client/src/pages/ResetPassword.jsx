import React, { useState } from 'react'
import Header from '../components/home/Header'
import FormField from '../components/FormField'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [formData,setFormData]=useState({
    email:"",
    oldPassword:"",
    newPassword:""
  })
  const nav=useNavigate()
  const handleChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
 const [success,setSuccess]=useState("")
  const [resetError,setResetError]=useState("")
  const passwordPtr=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const handleResetPassword=async(e)=>{
    e.preventDefault();
    if(!passwordPtr.test(formData.newPassword)){
      return setResetError(`New password must contain:  1 Uppercase\n1 Lowercase\n1 Number\n1 Special Character\nMinimum 8 characters`)
    }
    try {
      const  res= await axios.post("http://localhost:5000/api/auth/reset/password",formData,{withCredentials:true});

setSuccess(res.data?.message)
setResetError("")
const timeout= setTimeout(()=>{
nav("/login")
},1000)
return()=>{
  clearTimeout(timeout)
}
    } catch (error) {
    
    setResetError(error.response?.data?.message)
      setSuccess("")
    }
  }
  return (
   <>
   <Header/>

   <div className="flex justify-center  w-full items-center min-h-screen">

    <form className=" w-[80%] shadow max-w-xl p-4 py-10" onSubmit={handleResetPassword}>
      <p className="text-black font-bold text-2xl text-center"> Rest Password</p>
    <FormField type="email" label="Email" onChange={handleChange}   name="email" value={formData.email} required={true} />
    <FormField type="password" onChange={handleChange}  name="oldPassword" label="Old Password" value={formData.oldPassword} required={true} />
    <FormField type="password" onChange={handleChange}   name="newPassword" label={"New Password"} value={formData.newPassword} required={true}/>
    {resetError && (
      <p className="text-red-500 text-xl font-semibold text-center p-2">{resetError}</p>
    )}
    {
      success && (
        <p className="text-green-500 font-semibold  text-center">{success}</p>
      )
    }
    <button type='submit' className="w-full mt-4 rounded-lg p-2 bg-blue-500 text-white text-center text-xl" >Reset</button>
    </form>
   </div>
   </>
  )
}

export default ResetPassword
