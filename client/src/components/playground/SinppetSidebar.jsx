import React, { useState } from "react";
import { Menu } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

const SnippetSidebar = ({  setCode,setLanguage,setSnippetId ,render}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [snippets,setSnippets]=useState([]);
  
  const filteredSnippets = snippets.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleGetAllSnippets=async()=>{
 try {
   const res= await axios.get("http://localhost:5000/snippets/all",{withCredentials:true});
    setSnippets(res.data?.data || [])
 } catch (error) {
    console.log(error)
 }
  }
  useEffect(()=>{
  handleGetAllSnippets();
  },[render])
  const handleGetSingleSnippets=async(id)=>{
 try {
  if(!id) return ;
   const res= await axios.get(`http://localhost:5000/snippets/single/${id}`,{withCredentials:true});
    setCode(res.data?.data.code || "")
    setLanguage(res.data?.data.language || "")
 } catch (error) {
    console.log(error)
 }
  }

  useEffect(()=>{
  handleGetSingleSnippets();
  })
   const handleNewSnippets=()=>{
    setCode(`//select language`)
    setLanguage("")
    setSnippetId(null)
   }

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-40 left-[30px] z-60 bg-indigo-600 text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-40  z-[50] left-0 h-full w-[260px] bg-white border-r shadow-sm p-4 z-40 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* TITLE */}
        <h2 className="text-xl font-bold mb-4">Saved Snippets</h2>

        {/* SEARCH BAR */}
        <button onClick={handleNewSnippets} className="w-full border px-3 py-2 rounded-lg mb-4 o bg-blue-500 text-white">
           New
        </button>
        <input
          type="text"
          placeholder="Search snippets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* SNIPPET LIST */}
        <div className="flex flex-col gap-2 overflow-y-auto h-[75vh]">
          {filteredSnippets.map((snippet) => (
            <button
              key={snippet._id}
              onClick={() =>(handleGetSingleSnippets(snippet._id),setSnippetId(snippet._id))}
              className="text-left px-3 py-2 rounded-lg hover:bg-indigo-50 transition"
            >
              {snippet.title}
            </button>
          ))}
        </div>
      </div>

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}
    </>
  );
};

export default SnippetSidebar;