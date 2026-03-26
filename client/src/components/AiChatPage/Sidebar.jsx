import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";


const ChatSidebar = ({ setChatId, setMessages ,setMenu,setTitle,setOnClose}) => {

  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  /* Load all chats */
  const getAllChats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/ai/chat",
        { withCredentials: true }
      );

      setChats(res.data.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  /* Create new chat */
  const createNewChat = () => {
    setChatId(null);
    setMessages([]);
  };

  /* Load selected chat messages */
  const getMessages = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/ai/chat/${id}`,
        { withCredentials: true }
      );
      setMenu(false)
      setMessages(res.data.messages);
      setChatId(id);

    } catch (error) {
      console.log(error);
    }
  };

  /* Search filter */
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
   
    <div className="w-[270px]  bg-[#020617] mt-[60px] md:mt-[66px] text-white h-screen flex flex-col p-4">

      {/* Title */}
      <h2 className="text-lg font-bold mb-4">DevForge AI</h2>

      {/* New Chat */}
      <button
        onClick={createNewChat}
        className="bg-blue-600 w-full py-2 rounded-lg mb-4 hover:bg-blue-700"
      >
        + New Chat
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 mb-4 outline-none"
      />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollBar space-y-2">
        {filteredChats.map((chat) => (
         <div
          onClick={() => getMessages(chat._id)}
  key={chat._id}
 
  className="p-3 rounded-lg flex justify-between cursor-pointer hover:bg-[#1e293b] transition"
>
  
  <h1  className="inline-block break-words">
    {chat.title.length > 27
      ? chat.title.substring(0, 27) + "..."
      : chat.title}
  </h1>
 <p onClick={()=>(setTitle(chat.title),setOnClose(true),setChatId(chat._id))} ><BsThreeDotsVertical/></p>
</div>
        ))}
      </div>

    </div>
    </>
  );
};

export default ChatSidebar;