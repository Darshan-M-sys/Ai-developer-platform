
import Header from '../components/home/Header'
import RoadmapSidebar from '../components/RoadmapSidebar'
import React, { useEffect, useState } from "react";
import axios from "axios";

import RoadmapPage from '../components/RoadmapPage';
import GenerateRoadmap from '../components/GenerateRoadmap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const AiRoadmaps = () => {

  const {isLogged,loading} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!loading && !isLogged){
      navigate("/login");
    }
  },[isLogged,loading])

 const [onSelect,setOnSelect] = React.useState(null)

 useEffect(()=>{
  fetchRoadmaps();
 }
  ,[])
 const [roadmaps, setRoadmaps] = React.useState([]);
   const fetchRoadmaps = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/ai/roadmap/roadmaps",
        { withCredentials: true }
      );

      setRoadmaps(res.data.roadmaps);
    } catch (err) {
      console.error(err);
    }
  };
  const[isOpen,setIsOpen] = React.useState(false);


  const handleDelete  = async (roadmapId) => {
    if(!window.confirm("Are you sure you want to delete this roadmap?")){
      return;
    }
    setRoadmaps(prev => prev.filter(rm => rm._id !== roadmapId));
    if(onSelect?._id === roadmapId){
      setOnSelect(null);
    }
    try {
      const res = await axios.delete(`http://localhost:5000/ai/roadmap/delete/${roadmapId}`, { withCredentials: true });
      console.log(res.data);
      if(!res.data.success){
        setOnSelect(null);
        fetchRoadmaps();
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
   
    <>
    {
      isOpen && <GenerateRoadmap isOpen={isOpen} setOnSelect={setOnSelect} onClose={()=>setIsOpen(false)} onSuccess={(newRoadmap)=>{
        setRoadmaps(prev => [...prev, newRoadmap]);
      }
      }/>
    }
    <Header/>
    <RoadmapSidebar setOnSelect={setOnSelect} roadmaps={roadmaps} setIsOpen={setIsOpen}/>
   <div className='md:ml-[250px] mt-[66px] bg-black h-[calc(100vh-66px)] p-4'>

      {onSelect ? (
        <RoadmapPage onSelect={onSelect} handleDelete={handleDelete}/>

      ) : (
     <div className=" flex h-full items-center justify-center text-white relative overflow-hidden">

  {/* 🌈 Animated Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-800 to-black animate-gradient"></div>

  {/* ✨ Glow Circles */}
  <div className="absolute w-full h-full bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
  <div className="absolute  w-full h-full bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

  {/* 🧠 Content */}
  <div className="relative text-center animate-fadeIn">
    <h2 className="text-2xl font-bold mb-2">
      🚀 No Roadmap Selected
    </h2>

    <p className="text-gray-300 text-sm">
      Select or generate a roadmap to view details
    </p>
  </div>
</div>

      )}
   </div>

      </>
  )
}

export default AiRoadmaps