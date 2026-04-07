import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineBook, AiOutlineRobot } from "react-icons/ai";

const fakeCourses = [
  { title: "Full Stack Developer", id: "C001" },
  { title: "Python for AI", id: "C002" },
  { title: "Data Science Basics", id: "C003" },
  { title: "React.js Mastery", id: "C004" },
  { title: "AI & Machine Learning", id: "C005" },
  { title: "SQL & Databases", id: "C006" },
];

const FakeCourses = () => {
  const [showExplain, setShowExplain] = useState(null);

  const toggleExplain = (id) => {
    setShowExplain(showExplain === id ? null : id);
  };

  return (
    <section className="py-24 px-6 bg-gray-900 text-white relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Demo view of lessons and courses powered by AI. Click AI Explain to see how it works!
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {fakeCourses.map((course, index) => (
          <motion.div
            key={course.id}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-lg hover:shadow-blue-500/40 transition cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-blue-500/20 rounded-full">
                <AiOutlineBook size={30} />
              </div>
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-400 text-sm">Course ID: {course.id}</p>

              <button
                onClick={() => toggleExplain(course.id)}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition"
              >
                <AiOutlineRobot size={18} /> AI Explain
              </button>

              {showExplain === course.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl text-gray-300 text-sm shadow-md border border-white/20"
                >
                  <strong>AI Explanation:</strong> This is a demo explanation for <em>{course.title}</em>. 
                  Learn, practice, and get AI-powered insights.
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FakeCourses;