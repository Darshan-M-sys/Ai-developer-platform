import React, { useState } from 'react'
import Header from "../components/home/Header"
import Navbar from '../components/AdminDashboard.jsx/Navbar'
import AdminSidebar from '../components/AdminDashboard.jsx/AdminSidebar'
import AdminStats from '../components/AdminDashboard.jsx/AdminStats'
import AdminCharts from '../components/AdminDashboard.jsx/AdminCharts'
import UsersTable from '../components/AdminDashboard.jsx/UserTable'
import TopCourses from '../components/AdminDashboard.jsx/TopCourses'


const AdminDashboard = () => {
  const [profileData,setProfileData]=useState({})
  return (
    <>
    <Header setProfileData={setProfileData} />
    <AdminSidebar/>
 <div className="md:ml-[270px] md:mt-[80px] mt-[70px]">
  <Navbar profileData={profileData}/>
  <AdminStats/>
  <AdminCharts/>
  <UsersTable/>

  <TopCourses/>

 </div>
    <div>

    </div>
    </>
  )
}

export default AdminDashboard
