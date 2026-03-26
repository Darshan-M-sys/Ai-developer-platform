import React, { useState } from "react";
import axios from "axios";
import FormField from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import ActionDisplay from "../components/ActionDisplay";
import Header from "../components/home/Header";

const Login = () => {
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
        "http://localhost:5000/api/auth/login",
        formData,
        {withCredentials:true}
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
          message:"OOps Error",
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
          AI Developer Platform
        </h1>

        <p className="text-lg text-center max-w-md">
          Build real projects, learn coding with AI assistance,
          practice problems, and become a better developer.
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-xl p-8 w-96">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

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

        
            <Link to="/forget/password" className="text-sm text-blue-500 cursor-pointer font-[600]">Forget Password</Link>
            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* OR */}

          <div className="my-4 text-center text-gray-500">
            OR
          </div>

          {/* GITHUB LOGIN */}

          <button
            onClick={() => {
              window.location.href =
                "http://localhost:5000/api/auth/github";
            }}
            className="w-full bg-black text-white flex justify-center items-center gap-4 p-3 rounded-lg hover:bg-gray-900 transition"
          >
          <span className="text-xl"><FaGithub/></span>  Continue with GitHub
          </button>

          {/* REGISTER LINK */}

          <p className="text-sm text-center mt-5 text-gray-600">

            Don't have an account?

            <Link to="/register" className="text-blue-600 cursor-pointer ml-1">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
    </>

  );

};

export default Login;