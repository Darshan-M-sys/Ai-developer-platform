import React, { useState } from 'react'
import ChatPage from '../components/AiChatPage/Chat'
import Sidebar from '../components/AiChatPage/Sidebar'
import Header from "../components/home/Header"
import ChatSettings from '../components/AiChatPage/ChatSettings'

const AiChatPage = () => {
  const[close,setOnClose]=useState(false)
  const [menu, setMenu] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [title,setTitle]=useState("");

  return (
    <>
{close  &&(
     <div className="fixed top-0 w-full z-[40]">
      <ChatSettings chatId={chatId} text={title} onClose={setOnClose}  setMessages={setMessages}/>
        </div>)}
      <Header/>

      <div className="mt-[66px] flex">

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 ${menu ? "left-[0px]" : "left-[-270px]"} 
          h-full z-50 transform transition-transform duration-300 md:hidden`}
        >
          <Sidebar setMessages={setMessages} setChatId={setChatId} setMenu={setMenu} setTitle={setTitle}setOnClose={setOnClose} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed top-0 left-0">
          <Sidebar setMessages={setMessages} setChatId={setChatId} setMenu={setMenu}  setTitle={setTitle}  setOnClose={setOnClose} />
        </div>

        {/* Chat Page */}
       
          <ChatPage
            messages={messages}
            setMessages={setMessages}
            chatId={chatId}
            setChatId={setChatId}
            setMenu={setMenu}
            menu={menu}
          />
       

      </div>
    </>
  )
}

export default AiChatPage