import React from 'react'
import Header from "../components/home/Header"
import Navbar from '../components/AdminDashboard.jsx/Navbar'
import AdminSidebar from '../components/AdminDashboard.jsx/AdminSidebar'
import AdminStats from '../components/AdminDashboard.jsx/AdminStats'
import AdminCharts from '../components/AdminDashboard.jsx/AdminCharts'
import UsersTable from '../components/AdminDashboard.jsx/UserTable'
import RecentActivity from '../components/AdminDashboard.jsx/RecentActivity'
import TopCourses from '../components/AdminDashboard.jsx/TopCourses'

const AdminDashboard = () => {
  return (
    <>
    <Header/>
    <AdminSidebar/>
 <div className="md:ml-[270px] md:mt-[80px] mt-[70px]">
  <Navbar/>
  <AdminStats/>
  <AdminCharts/>
  <UsersTable/>
  <RecentActivity/>
  <TopCourses/>

 </div>
    <div>

    </div>
    </>
  )
}

export default AdminDashboard
