import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ForgetPassword = () => {

  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  // SEND OTP AUTOMATICALLY

  useEffect(() => {

    const sendOTP = async () => {

      await axios.post(
        "http://localhost:5000/send-otp",
        { email }
      );

      alert("OTP sent to your email");

    };

    sendOTP();

  }, []);

  // VERIFY OTP

  const verifyOTP = async () => {

    try {

      await axios.post(
        "http://localhost:5000/verify-otp",
        { email, otp }
      );

      setStep(2);

    } catch {

      alert("Invalid OTP");

    }

  };

  // RESET PASSWORD

  const resetPassword = async () => {

    await axios.post(
      "http://localhost:5000/reset-password",
      { email, password }
    );

    alert("Password updated");

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Verify OTP
        </h2>

        {step === 1 && (

          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-3 rounded mb-4"
              onChange={(e)=>setOtp(e.target.value)}
            />

            <button
              onClick={verifyOTP}
              className="w-full bg-blue-600 text-white p-3 rounded"
            >
              Verify OTP
            </button>
          </>

        )}

        {step === 2 && (

          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-3 rounded mb-4"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="w-full bg-green-600 text-white p-3 rounded"
            >
              Reset Password
            </button>
          </>

        )}

      </div>

    </div>

  );

};

export default ForgetPassword;