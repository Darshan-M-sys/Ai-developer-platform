import { motion } from "framer-motion";
import heroBg from "../assets/hero.png";
import ChatbotAnimation from "./ChatbotAnimation";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* 🖼️ BACKGROUND IMAGE */}
      <img
        src={heroBg}
        alt="AI Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🌈 GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* 💎 CONTENT */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16">

        {/* LEFT SIDE TEXT */}
        <div className="max-w-xl text-white text-center md:text-left">

          <motion.h1
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
       
  Learn Coding with{" "}
  <span className="text-blue-400">AI</span> at{" "}
  <span className="text-purple-500">DevForge</span>


          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg text-gray-300"
          >

  Build projects, solve problems, and level up your skills with AI-powered guidance.

          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
              Get Started
            </button>

            <button className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-700">
              Live Demo
            </button>
          </motion.div>

        </div>

        {/* RIGHT SIDE CHATBOT */}
        <div className="mt-10  mr-[100px] md:mt-0 flex justify-center items-center">
          <ChatbotAnimation />
        </div>

      </div>

    </div>
  );
};

export default Hero;