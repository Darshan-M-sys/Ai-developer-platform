import React, { useContext } from "react";
import ChatbotAnimation from "./ChatbotAnimation"; // your animation component
import { FaRobot } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const AiChatbotSection = () => {
  const {isLogged}=useContext(AuthContext)
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 gap-12">
        
        {/* Left - Text & CTA */}
        <div className="md:w-1/2 flex flex-col gap-6 text-white">
          <h2 className="text-4xl font-bold">
            Experience Your DevForge AI Assistant
          </h2>
          <p className="text-blue-100 text-lg">
            Get instant answers, generate ideas, and explore AI-powered solutions right on your DevForge page.
          </p>
          <button onClick={()=>isLogged?window.location.href="/ai/chat":window.location.href="/login"} className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all w-max">
            Try DevForge AI Now
          </button>
        </div>

        {/* Right - Fake Chatbot + Animation */}
        <div className="md:w-1/2 relative flex justify-center md:justify-end">
          {/* Fake Chatbot Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FaRobot className="text-blue-600 text-2xl" />
              <h3 className="text-lg font-semibold text-gray-900">DevForge AI Chatbot</h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg w-3/4">
                Hi there! I can help you with AI tasks.
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg w-2/3 self-end cursor-pointer hover:bg-blue-700 transition-all">
                Show me an example.
              </div>
              <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg w-1/2">
                Sure! Check this out.
              </div>
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Chatbot Animation */}
          <div className="absolute -bottom-12 -right-12 w-40 h-40">
            <ChatbotAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChatbotSection;