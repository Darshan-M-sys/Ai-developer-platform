import React from 'react'
import Header from '../components/home/Header'
import Hero from '../components/home/Hero'
import ChatbotAnimation from '../components/home/ChatbotAnimation'
import Features from '../components/home/Features'
import AiChatbotSection from '../components/home/AiChatbotSection'
import CodePlayground from '../components/home/CodePlayground'
import CertificateVerification from '../components/home/CertificateVerification'
import HowItWorks from '../components/home/HowItWorks'
import FakeCourses from '../components/home/FakeCourses'

const Home = () => {
  return (
<div className="">
      <Header/>
    <div className=" md:mt-[0px] mt-[65px] bg-black text-white">
      <Hero/>
      <Features/>
      <AiChatbotSection/>
      <FakeCourses/>
      <CodePlayground/>
      <CertificateVerification/>
      <HowItWorks/>
      </div>
    </div>
  )
}

export default Home
