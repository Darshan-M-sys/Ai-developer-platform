import axios from "axios";
import React from "react";

const ChatSettings = ({ text,chatId, onClose,setMessages }) => {
const handleDeleteChat = async () => {
  try {
    if(!window.confirm("Are you sure to delete this chat")) return;
    const res = await axios.delete(

      `http://localhost:5000/ai/chat/${chatId}`,
      { withCredentials: true }
    );
    if (res.status === 200) {
      
      // close modal
       onClose(false)
       window.location.reload()
    }
  } catch (error) {
    console.log(error);
    alert("Failed to delete chat");
  }
};
const handlePinChat = async () => {
  try {
    const res = await axios.put(
      `http://localhost:5000/ai/chat/pin/${chatId}`,
      {},
      { withCredentials: true }
    );

    if (res.status === 200) {
      // update UI and move pinned chat to top
      setMessages((prevChats) => {
        const updated = prevChats.map((chat) =>
          chat._id === chatId ? { ...chat, isPinned: true } : chat
        );

        // move pinned chats to top
        return updated.sort((a, b) => b.isPinned - a.isPinned);
      });

      onClose(false);
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    alert("Failed to pin chat");
  }
};
  return (
    <div className="fixed inset-0 z-[40] flex items-center justify-center bg-black/60">
      {/* Modal Box */}
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 relative">
        {/* Close Button */}
        <button
          onClick={()=>onClose(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-3">
          Chat Settings
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-5">
          {text || "You wanted to change this chat settings"}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button onClick={handlePinChat} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Pin Chat
          </button>

          <button onClick={handleDeleteChat} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Delete Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;