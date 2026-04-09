import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import React from "react";
import { FaArrowRightArrowLeft, FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaygroundNav = ({ language,code, setLanguage,setOpenSaveSnippets,snippetId,setAction }) => {
  const handleUpdateSnippets=async()=>{
     try {
       const res= await axios.put(`http://localhost:5000/snippets/update/${snippetId}`,{code},{withCredentials:true})
       if(res.data?.success){
        setAction({show:true,
          message:res.data?.msg,
          type:"success"
        })
       }
     } catch (error) {
       console.log(error.message)
     }
  }
  const languages = [
  { label: "Select", value: "" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Go", value: "go" },
  { label: "PHP", value: "php" },
  { label: "Rust", value: "rust" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "HTML", value: "html" },
  { label: "JSON", value: "json" },
  { label: "SQL", value: "sql" },
  { label: "Markdown", value: "markdown" },
];


  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-blue-500 border-b shadow-sm">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
         <Link to="/dashboard" className="absolute left-3 text-white bg-black/30 p-2 rounded-full">  <ArrowBigLeft/></Link>
        {/* LEFT - LANGUAGE SELECTOR */}

        <div className="flex items-center  gap-3">
       
          <label className="font-medium text-white">Language:</label>

          <select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
>
  {languages.map((lang) => (
    <option key={lang.value} value={lang.value}>
      {lang.label}
    </option>
  ))}
</select>
        </div>

        {/* RIGHT - SAVE BUTTON */}
        <button
          onClick={()=>{snippetId?handleUpdateSnippets():setOpenSaveSnippets(true)}}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          {snippetId?"Update Snippet":"Save Snippets"} 
        </button>

      </div>
    </nav>
  );
};

export default PlaygroundNav;