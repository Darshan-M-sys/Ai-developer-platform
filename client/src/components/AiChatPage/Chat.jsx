import { Copy, CopyCheck } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { TfiClose, TfiMenu } from "react-icons/tfi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaArrowUp } from "react-icons/fa6";
import videoAi from "../assets/videoAI.mp4";
import LoadingChatAnimate from "../LoadingChatAnimate";
import devForge from "../assets/devforge.png"

const ChatPage = ({
  messages = [],
  setMessages,
  chatId,
  setChatId,
  menu,
  setMenu,
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState(""); // typing animation
  const bottomRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    setInput(e.target.value);
  };

  /* auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  /* send message */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);

    const messageText = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ai/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          message: messageText,
          chatId: chatId,
        }),
      });

      const data = await res.json();

      /* save chatId if first message */
      if (!chatId) {
        setChatId(data.chatId);
      }

      /* typing animation - ultra fast */
const fullText = data.reply;
let index = 0;
setTypingText("");
setLoading(false)
const typing = setInterval(() => {
  index += 5; // increase speed here (5 characters at once)

  setTypingText(fullText.slice(0, index) );

  if (index >= fullText.length) {
    clearInterval(typing);

    const aiMsg = {
      role: "ai",
      content: fullText,
    };

    setMessages((prev) => [...prev, aiMsg]);
    setTypingText("");
    setLoading(false);
  }
}, 10);
    } catch (error) {
      console.log("AI error:", error);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const today = new Date();

    if (d.toDateString() === today.toDateString()) {
      return "Today " + d.toLocaleTimeString();
    }

    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
    <div className="flex flex-col   md:ml-[270px] h-[90vh] w-full bg-[#f1f5f9]">
      {/* HEADER */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <img src={devForge} className="h-[50px] rounded-full" alt="devforge"/>
        <h2 className="font-semibold p-2 text-xl text-white">
          DevForge AI Assistant 
        </h2>

     </div>
        <button
          onClick={() => setMenu(!menu)}
          className="text-xl md:hidden text-gray-700"
        >
          {!menu ? <TfiMenu /> : <TfiClose />}
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 relative scrollBar md:overflow-y-auto md:mb-[100px] p-6 space-y-6">
        {messages.length === 0 && (
          <video
            src={videoAi}
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}

        {messages.map((msg, i) => {
          const isCode = msg.content.includes("```");

          return (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
             
              <div className="max-w-[650px] w-full rounded-xl">
                {isCode ? (
                  <ReactMarkdown
                    components={{
                      code({ inline, className, children }) {
                        const match = /language-(\w+)/.exec(className || "");

                        return !inline && match ? (
                          <div className="relative bg-white  scrollBar shadow-sm border p-2 pt-6 rounded-xl">
                            <button
                              className="absolute top-1 scrollBar text-gray-500 right-3"
                              onClick={() => handleCopy(children)}
                            >
                              {!copied ? <Copy /> : <CopyCheck />}
                            </button>

                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code>{children}</code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                    
                  </ReactMarkdown>
                ) : (
                  <div>
                    <div
                      className={`px-5 py-3  text-sm rounded-2xl shadow-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white  rounded-br-none"
                          : "bg-white text-gray-800 prose rounded-bl-none"
                      }`}
                    >
                      <ReactMarkdown>
                      {msg.content}
                      </ReactMarkdown>
                    </div>

                    <span className="flex justify-end text-gray-400 text-sm">
                      {formatDate(msg.createdAt || Date.now())}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI typing animation */}
        {typingText && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-5 py-3 rounded-2xl shadow-sm max-w-[650px]">
              {typingText}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        )}
{loading && ( <div className="flex justify-start"> <LoadingChatAnimate/> </div> )}
        <div ref={bottomRef}></div>
      </div>

      {/* INPUT BOX */}
      <div className="bg-blue-500 fixed w-full bottom-0 border-t md:px-6 py-4">
        <div className="flex gap-3 max-w-[800px] mx-auto">
          <div className="shadow border rounded-[40px] bg-white w-full items-end flex gap-3 p-3">
            <textarea
              value={input}
              onChange={handleInput}
              placeholder="Ask DevForge AI anything about coding..."
              rows={1}
              className="flex-1 max-h-[200px] scrollBar  overflow-y-auto px-4 py-3 rounded-xl outline-none resize-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white h-fit  p-4 rounded-full hover:bg-blue-700 transition"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatPage;