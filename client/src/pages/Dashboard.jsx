import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const nav = useNavigate();

  const handleUserData = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/auth/me',
        { withCredentials: true }
      );
      setUserData(res.data?.data || {});
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  useEffect(() => {
    if (!userData.role) return; // ✅ wait until role exists

    if (userData.role === "student") {
      nav("/student/dashboard");
    } else if (userData.role === "instructor") {
      nav("/instructor/dashboard");
    } else if (userData.role === "admin") {
      nav("/admin/dashboard");
    }
  }, [userData, nav]);

  // ✅ Loading state
  if (!userData.name || !userData.email) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Dashboard Loading...</h1>
      </div>
    );
  }

  // ✅ fallback UI (optional)
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>Redirecting...</h1>
    </div>
  );
};

export default Dashboard;