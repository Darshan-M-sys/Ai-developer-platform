import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function Roadmap() {
  return (
    <section className="w-full py-20 px-6 bg-gradient-to-br from-purple-900 via-slate-900 to-black text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Generate Your AI Learning Roadmap 🚀
          </motion.h2>

          <p className="text-gray-300 mb-6 text-lg">
            Tell us your goal, and our AI will instantly create a personalized step-by-step roadmap with projects, skills, and timelines.
          </p>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ Beginner → Advanced path</li>
            <li>✔ Real-world projects included</li>
            <li>✔ Smart AI recommendations</li>
          </ul>

          <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg rounded-xl">
            <Link to="/ai/roadmap" className="text-white no-underline">
              Generate My Roadmap
            </Link>
          </button>
        </div>

        {/* RIGHT FAKE UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
        >
          {/* Input Fake */}
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">Goal</p>
            <div className="bg-black/40 p-3 rounded-lg text-gray-200">
              Become a Full Stack Developer
            </div>
          </div>

          {/* Steps Fake */}
          <div className="space-y-4">
            {[
              "HTML, CSS Basics",
              "JavaScript Fundamentals",
              "React & Frontend Projects",
              "Node.js & Backend",
              "Build Full Stack Apps"
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/30 p-3 rounded-lg flex items-center justify-between"
              >
                <span>{step}</span>
                <span className="text-green-400">✔</span>
              </motion.div>
            ))}
          </div>

      
        </motion.div>
      </div>
    </section>
  );
}
