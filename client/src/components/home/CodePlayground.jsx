// components/CodePlayground.jsx
import React, { useContext, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const CodePlayground = () => {
  const {isLogged}=useContext(AuthContext)
  const [copied, setCopied] = useState(false);

  const codeString = `// Start coding here...
function helloWorld() {
  console.log("Hello, AI DevForge!");
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gradient-to-b from-blue-950 via-purple-950 to-gray-900 py-24">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          CodePlayground <span className="text-blue-400">AI-Powered</span>
        </h2>
        <p className="text-blue-200 mb-12 max-w-2xl mx-auto">
          Practice coding, run and debug your programs, optimize with AI, and even get explanations for your code instantly!
        </p>

        {/* Playground Card */}
        <div className="bg-gray-900/80 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto relative backdrop-blur-md border border-white/10">
          {/* Copy Button */}
          <div className="flex justify-end mb-2">
            <button  onClick={handleCopy} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>

          {/* Fake Code Editor */}
          <div className="bg-gray-800 text-green-400 font-mono p-4 rounded-lg h-64 overflow-auto text-left whitespace-pre-wrap">
            {codeString}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button onClick={()=>isLogged?window.location.href="/playground": window.location.href="/profile"} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Run Code
            </button>
            <button onClick={()=>isLogged?window.location.href="/playground": window.location.href="/profile"} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition">
              Debug
            </button>
            <button onClick={()=>isLogged?window.location.href="/playground": window.location.href="/profile"} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
              Optimize with AI
            </button>
            <button onClick={()=>isLogged?window.location.href="/playground": window.location.href="/profile"} className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
              Explain Code
            </button>
          </div>

          {/* Call to Action */}
          <p className="mt-6 text-blue-200">
            Explore coding with AI and see instant results. Start building smarter today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default CodePlayground;