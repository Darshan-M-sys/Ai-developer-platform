import React, { useState } from "react";
import axios from "axios";
import FormField from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import ActionDisplay from "../components/ActionDisplay";
import Header from "../components/home/Header";

const AdminLogin = () => {
  const nav= useNavigate();
 const [action,setAction]=useState({
  show:false,
  message:"",
  type:""
 })
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        formData,{
withCredentials:true
        }
      );
      if(res.data.success){
        setAction({
          message:res.data.message,
          show:true,
          type:"success"
        })
        nav("/dashboard")
      }
    } catch (err) {
     if(err.status===400){
       setAction({
          message:err.response.data?.message,
          show:true,
          type:"error"
        })
        
     }else{
      setAction({
          message:err.response.data?.message,
          show:true,
          type:"error"
        })
     }
    }

    setLoading(false);

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
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex-col justify-center items-center p-10">

      <h1 className="text-4xl font-bold mb-4">
  Admin Login
</h1>

<p className="text-lg text-center max-w-md">
  Sign in to access the admin dashboard, manage users, monitor platform activity,
  and control the AI Developer Learning Platform.
</p>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl  h-[400px] rounded-xl p-8 w-96">

          <h2 className="text-2xl font-bold text-center mb-6">
           Admin  Login 
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-3">

            {/* EMAIL */}

            <FormField
              type="email"
              name="email"
              value={formData.email}
              required={true}
              label="Email"
              onChange={handleChange}
            />

            {/* PASSWORD */}

              <FormField
                type="password"
                name="password"
                value={formData.password}
                required={true}
                label="password"
                onChange={handleChange}
              />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

       
        

        </div>

      </div>

    </div>
    </>

  );

};

export default AdminLogin;