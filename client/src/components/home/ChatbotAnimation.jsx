import { motion } from "framer-motion";
import chatbot from "../assets/chatbot.png";
import { useEffect, useState } from "react";

const ChatbotAnimation = () => {
  const text = "How can I help you learn today?";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;

      if (i === text.length) clearInterval(interval);
    }, 100); // speed

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative z-[50] flex flex-col items-center">

      {/* 💬 Chat Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mb-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-4 py-3 rounded-xl shadow-lg max-w-[250px]"
      >
        <p className="text-sm">
         {displayText}
        </p>

        {/* Typing dots */}
        <div className="flex gap-1 mt-2">
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-300"></span>
        </div>
      </motion.div>

      {/* 🤖 Chatbot Image */}
      <div className="relative flex justify-center items-center">

        {/* Glow */}
        <div className="absolute w-72 h-72 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>

   <motion.img
  src={chatbot}
  alt="AI Chatbot"
  className="relative z-10 w-[250px] md:w-[350px]"

  animate={{ 
    y: [0, -15, 0],
    rotate: [0, 3, -3, 0]
  }}

  transition={{ 
    duration: 4, 
    repeat: Infinity 
  }}
/>
      </div>
    </div>
  );
};

export default ChatbotAnimation;