import React from 'react'
import Header from '../components/home/Header'
import Sidebar from '../components/InstructorDashbaord/Sidebar'
import Navbar from '../components/InstructorDashbaord/Navbar'
import Stats from '../components/InstructorDashbaord/Stats'
import EnrollmentGraph from '../components/InstructorDashbaord/EnrollmentGrahp'
import CoursesGrowth from '../components/InstructorDashbaord/CoursesGrowth'
import StudentsTable from '../components/InstructorDashbaord/StudentsTable'
import CoursesTable from '../components/InstructorDashbaord/CoursesTable'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorDashboard = () => {
  const nav=useNavigate()
  const [profileData,setProfileData]=useState([])
  const [isDeleted,setIsDeleted]=useState(false)
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

const [courses,setCourses]=useState([])
  const handleGetMyCourses=async()=>{
try {
  const res=await axios.get("http://localhost:5000/instructor/courses",{withCredentials:true});
 setCourses(res.data?.data || [])
} catch (error) {
  console.log(error)
}
  }
  
  useEffect(()=>{
handleGetMyCourses();
  },[isDeleted])

     const handleDeleteCourse=async(courseId)=>{
      try {
        if(!window.confirm("Are you sure to delete this course!")) return;
         const res= await axios.delete(`http://localhost:5000/instructor/course/${courseId}`,{withCredentials:true});
         if(res.data?.success){
  setIsDeleted(true)
         }
      } catch (error) {
        console.log(error.message)
      }
    } 
const [students,setStudents]=useState([])
     const handleGetAllEnrolledStudents=async()=>{
      try {
      const res= await axios.get("http://localhost:5000/instructor/students",{withCredentials:true});
   setStudents(res.data?.data || []) 
  
      } catch (error) {
       console.log(error.message) 
      }
     }

     useEffect(()=>{
     handleGetAllEnrolledStudents();
     },[])



  return (
    <>
   <Header setProfileData={setProfileData}/>

    <div className="md:mt-[72px]">

        <Sidebar />
    </div>
    <div className="md:ml-[250px]    md:mt-[66px]">
      <Navbar profileData={profileData}/>
      <Stats statsData={statsData} />
      <div className="flex w-full flex-col gap-2 md:flex-row ">
      <EnrollmentGraph/>
      
      <CoursesGrowth/>
      </div>
      <StudentsTable students={students}/>
      <CoursesTable courses={courses} handleDeleteCourse={handleDeleteCourse}/>
      
    </div>
    </>
  )
}

export default InstructorDashboard
