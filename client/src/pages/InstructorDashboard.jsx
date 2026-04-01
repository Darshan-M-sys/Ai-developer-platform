import React from 'react'
import Header from '../components/home/Header'
import Sidebar from '../components/InstructorDashbaord/Sidebar'
import Navbar from '../components/InstructorDashbaord/Navbar'
import Stats from '../components/InstructorDashbaord/Stats'
import EnrollmentGraph from '../components/InstructorDashbaord/EnrollmentGrahp'
import CoursesGrowth from '../components/InstructorDashbaord/CoursesGrowth'
import StudentsTable from '../components/InstructorDashbaord/StudentsTable'
import CoursesTable from '../components/InstructorDashbaord/CoursesTable'
import AssignedCoursesTable from '../components/InstructorDashbaord/AssignedCoursesTable'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const InstructorDashboard = () => {
const [statsData,setStatsData]=useState({})
  const handleGetStatsData=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/instructor/stats",{withCredentials:true});
      setStatsData(res.data?.data || {})
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
handleGetStatsData();
  },[])

  const handleGetMyCourses=async()=>{
try {
  const res=await axios.get("http://localhost:5000/instructor/courses",{withCredentials:true});
  console.log(res.data)
} catch (error) {
  console.log(error)
}
  }
  
  useEffect(()=>{
handleGetMyCourses();
  },[])
  return (
    <>
   <Header/>

    <div className="md:mt-[72px] mt-[66px]">

        <Sidebar/>
    </div>
    <div className="md:ml-[250px]    md:mt-[66px]">
      <Navbar/>
      <Stats statsData={statsData}/>
      <div className="flex w-full flex-col gap-2 md:flex-row ">
      <EnrollmentGraph/>
      
      <CoursesGrowth/>
      </div>
      <StudentsTable/>
      <CoursesTable/>
      
    </div>
    </>
  )
}

export default InstructorDashboard
