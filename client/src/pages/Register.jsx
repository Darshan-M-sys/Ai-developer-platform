import React, { useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa";
import FormField from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import ActionDisplay from "../components/ActionDisplay";
import Header from "../components/home/Header";
const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const [action,setAction]=useState({
    message:"" ,
    type:"",
    show:false
  })

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [passwordPatternMatch,setPasswordPatternMatch]=useState(true)
const navigate = useNavigate();
const passwordPtr=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const handleSubmit = async (e) => {
  e.preventDefault();
   if(!passwordPtr.test(formData.password)){
   setPasswordPatternMatch(false)
   return;
   }  

  if (!formData.name || !formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }
  try {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,{withCredentials:true}
    );
   if(res.data.success){
    setAction(
      {
        message:res.data.msg,
        show:true,
        type:'success'
      }
    )
 navigate("/dashboard");
   }
  } catch (err) {
    if(err.status===400){
      setAction({
        message:"User already Created!",
        type:"error",
        show:true
      })
    }else{
      setAction({
        message:"OOPS Error",
        type:"error",
        show:true
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

      {/* LEFT SIDE DESIGN */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex-col justify-center items-center p-10">

        <h1 className="text-4xl font-bold mb-4">
          AI Developer Platform
        </h1>

        <p className="text-lg text-center max-w-md">
          Learn programming with AI guidance, coding playground,
          real projects, and developer tools.
        </p>

      </div>

      {/* RIGHT SIDE FORM */}

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-xl p-8 w-96">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}

          <FormField
              type="text"
              name="name"
              label={"Fullname"}
            
              minLength={4}
              value={formData.name}
              required={true}
              onChange={handleChange}
            />

            {/* EMAIL */}

        <FormField
              type="email"
              name="email"
              label="Email"
              required={true}
              value={formData.email}
              onChange={handleChange}
            />

            {/* PASSWORD */}

              <FormField
                type="password"
                name="password"
                value={formData.password}
                required={true}
                error={passwordPatternMatch?"":"Password must contain:\n1 Uppercase\n1 Lowercase\n1 Number\n1 Special Character\nMinimum 8 characters"}
                label="Password"
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          {/* OR */}

          <div className="my-4 text-center text-gray-500">
          <span className="w-[10px] h-[20px] bg-blue-800"/> OR
          </div>

          {/* GITHUB LOGIN */}

          <button
            onClick={() => {
              window.location.href =
                "http://localhost:5000/api/auth/github";
            }}
            className="w-full bg-black text-white justify-center flex items-center gap-2 p-3 rounded-lg hover:bg-gray-900 transition"
          >
        <span className="text-xl">
            <FaGithub/></span>  Continue with GitHub
          </button>

          {/* LOGIN LINK */}

          <p className="text-sm text-center mt-5 text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-600 cursor-pointer ml-1">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
    </>
  );
};

export default Register;