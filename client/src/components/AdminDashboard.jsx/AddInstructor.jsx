import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import FormField from "../FormField";
import axios from "axios";

const AddInstructor = ({ setAction,setOnOpenAddInst }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null,
  });


  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       const data= new FormData();
     Object.keys(formData).forEach(element => {
      data.append(element,formData[element]);
     });
      const res=await axios.post('http://localhost:5000/admin/instructors/create',data,{withCredentials:true});
  setAction({
    show:true,
    message:res.data?.message,
    type:"success"
   
  })
  setOnOpenAddInst(false);
    } catch (error) {
     if(error.status===400){
      setAction({
    show:true,
    message:error.response.data?.message,
    type:"error"
  })
  console.log(error.message)
     }
    }
  };


 
  return (
    <>
    <div className="fixed zoom inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={()=>setOnOpenAddInst(false)}
          className="absolute right-4 top-3 text-gray-500 text-xl"
        >
          <MdClose/>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-5">Add Instructor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <FormField
            label="Instructor Name"
            name="name"
            value={formData.name}
            required={true}
            onChange={handleChange}
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
             required={true}
            onChange={handleChange}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
             required={true}
            value={formData.password}
            onChange={handleChange}
          />

          <FormField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Image Upload */}
           <FormField
            label="Profile Image"
            file={true}
             type="file"
            onChange={(e)=>{setFormData((prev)=>({...prev,image:e.target.files[0]}))}}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={()=>setOnOpenAddInst(false)}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-black text-white"
            >
              Add Instructor
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
  );
};

export default AddInstructor;