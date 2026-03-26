import axios from "axios";
import React, { useState } from "react";


const SaveSnippets = ({ code, onClose,language,setAction,render,setRender}) => {
  const [title, setTitle] = useState("");


  const handleSaveSnippets=async()=>{
      if (!title.trim()) return;
    try {
      const res= await axios.post('http://localhost:5000/snippets/save',{code,language,title},{withCredentials:true})
      if(res.data.success){
        onClose(false)
        setAction({
          show:true,
          message:res.data?.msg,
        type:"success"
              })
     setRender(!render)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      {/* MODAL BOX */}
      <div className="bg-white w-[400px] rounded-xl p-6 shadow-lg">
        
        <h2 className="text-xl font-bold mb-4">Save Snippet</h2>

        {/* TITLE INPUT */}
        <input
          type="text"
          placeholder="Enter snippet title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          
          <button
            onClick={()=>onClose(false)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveSnippets}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
};

export default SaveSnippets;