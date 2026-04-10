import React from "react";
import { motion } from "framer-motion";
import { Code2, Bot, Sparkles, PlayCircle } from "lucide-react";
import Header from "../components/home/Header";
import { Link } from "react-router-dom";

const LiveDemo = () => {
  return (
    <>
    <Header/>
    <div className="bg-gradient-to-b md:mt-[66px] mt-[55px] from-gray-900 via-gray-800 to-black text-white min-h-screen">

      {/* 🔥 HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Learn Coding with{" "}
          <span className="text-blue-400">AI DevForge 🚀</span>
        </motion.h1>

        <p className="mt-6 text-gray-300 max-w-xl">
          Practice, debug, and optimize your code with an AI assistant.
          Build real-world projects faster and smarter.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
            Get Started
          </button>

          <button className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            Live Demo
          </button>
        </div>
      </section>

      {/* ⚡ FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12">

        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <Bot className="text-blue-400 mb-3" />
          <h3 className="text-xl font-semibold">AI Code Assistant</h3>
          <p className="text-gray-400 mt-2">
            Ask questions, debug code, and get instant explanations.
          </p>
             <button  className="bg-blue-500 px-6 py-2 mt-2 rounded-lg font-semibold hover:bg-blue-600 transition">
              <Link to="/ai/chat">
            AI Chat
            </Link>
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <Code2 className="text-green-400 mb-3" />
          <h3 className="text-xl font-semibold">Live Code Playground</h3>
          <p className="text-gray-400 mt-2">
            Write and run HTML, CSS, and JavaScript in real-time.
          </p>
            <button  className="bg-blue-500 px-6 py-2 mt-2 rounded-lg font-semibold hover:bg-blue-600 transition">
              <Link to="/playground">
               Playground
            </Link>
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <Sparkles className="text-purple-400 mb-3" />
          <h3 className="text-xl font-semibold">AI Optimization</h3>
          <p className="text-gray-400 mt-2">
            Improve performance and clean your code automatically.
          </p>
          
        </div>

      </section>

      {/* 🎯 LIVE DEMO SECTION */}
      <section className="px-6 py-16 bg-gray-900">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            🚀 Try Live AI Coding Demo
          </h2>
          <p className="text-gray-400 mt-3">
            Experience how AI helps you write and improve code instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* 🧠 Instructions */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">
              📝 How it Works
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>👉 Write your code in the editor</li>
              <li>👉 Click "Run" to see output instantly</li>
              <li>👉 Ask AI to explain your code</li>
              <li>👉 Optimize & debug with AI suggestions</li>
              <li>👉 Save & share your projects</li>
            </ul>
          </div>

          {/* 💻 Demo Box */}
          <div className="bg-black p-4 rounded-2xl border border-gray-700 shadow-lg">

            <div className="bg-gray-900 p-3 rounded-md text-sm text-green-400 font-mono">
{`function greet(name) {
  return "Hello " + name;
}

console.log(greet("Dev"));`}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                 <Link to="/playground">
                <PlayCircle size={18} /> Run Code
                </Link>
              </button>

              <button className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600">
                    <Link to="/ai/chat">
                Ask AI 🤖
                </Link>
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* 💡 USE CASES */}
      <section className="px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          💡 Real Use Cases
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-gray-800 p-6 rounded-xl">
            <h4 className="font-semibold text-lg">👨‍🎓 Students</h4>
            <p className="text-gray-400 mt-2">
              Learn coding faster with AI explanations and practice tools.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h4 className="font-semibold text-lg">💻 Developers</h4>
            <p className="text-gray-400 mt-2">
              Debug, optimize, and write production-ready code quickly.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h4 className="font-semibold text-lg">🚀 Startups</h4>
            <p className="text-gray-400 mt-2">
              Build MVPs faster with AI-powered development tools.
            </p>
          </div>

        </div>

      </section>

      {/* 🎯 CTA */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600">

        <h2 className="text-3xl font-bold">
          Start Building with AI Today 🚀
        </h2>

        <p className="mt-4 text-gray-200">
          Join the future of coding with AI-powered tools.
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
          <Link to="/courses">
          Get Started Free
          </Link>
        </button>

      </section>

    </div>
    </>
  );
};

export default LiveDemo;