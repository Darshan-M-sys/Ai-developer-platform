import React from "react";
import { Bug, Lightbulb, Wand2, Copy } from "lucide-react";
import axios from "axios";
import LoadingChatAnimate from "../LoadingChatAnimate"
import { useState } from "react";
const AIActions = ({ code,language,setAiReply,setAiResponses }) => {
const [isExplain,setIsExplain]=useState(false)
const[isExplainLoading,setIsExplainLoading]=useState(false);
const[isDebugLoading,setIsDebugLoading]=useState(false);
const[isOptimizeLoading,setIsOptimizeLoading]=useState(false);
  const handleExplain = async () => {
    setAiResponses(null)
    try{
      
      setIsExplainLoading(true)
  const res = await axios.post("http://localhost:5000/ai/playground/explain", { code, language });
   setAiReply(res.data?.reply)
    setIsExplainLoading(false)
    setIsExplain(true)
  
    }catch(err){
      console.log(err.message)
    }
};
 

  const handleDebug = async () => {
   setAiResponses(null)
  setIsDebugLoading(true)
    try{
  const res = await axios.post("http://localhost:5000/ai/playground/debug", { code, language });
   setAiReply(res.data?.reply)
    setIsDebugLoading(false)
    }catch(err){
      console.log(err.message)
    }
  };

  const handleOptimize = async () => {
    setAiResponses(null)
  setIsOptimizeLoading(true)
    try{
  const res = await axios.post("http://localhost:5000/ai/playground/optimize", { code, language });
   setAiReply(res.data?.reply)
    setIsOptimizeLoading(false)
    }catch(err){
      console.log(err.message)
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="w-full border-t rounded-xl mt-10 bg-white px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
      
      {/* LEFT SIDE BUTTONS */}
      <div className="flex flex-wrap gap-3">

        <button
          onClick={handleExplain}
      
          className={`flex items-center gap-2  bg-blue-600 hover:bg-blue-70  text-white px-4 py-2 rounded-lg  transition`}
        >
         {isExplainLoading?<LoadingChatAnimate/>:
         <>
          <Lightbulb size={18} />
          Explain Code
          </>}

        </button>

        <button
          onClick={handleDebug}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
            {isDebugLoading?<LoadingChatAnimate/>:
         <>
          <Bug size={18} />
          Debug Code
          </>}

        
        </button>

        <button
          onClick={handleOptimize}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
           {isOptimizeLoading?<LoadingChatAnimate/>:
         <>
          <Wand2 size={18} />
          Make Efficient
          </>}
        </button>


      </div>

      {/* COPY BUTTON */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        <Copy size={18} />
        Copy Code
      </button>

    </div>
  );
};

export default AIActions;