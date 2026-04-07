import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCode, AiOutlineRobot, AiOutlineCheckCircle, AiOutlineLineChart } from "react-icons/ai";

const steps = [
  {
    icon: <AiOutlineCode size={30} />,
    title: "Write Code",
    desc: "Use our AI-powered editor to write, run, and debug code effortlessly.",
  },
  {
    icon: <AiOutlineRobot size={30} />,
    title: "AI Assistance",
    desc: "Get smart suggestions, optimizations, and explanations from the AI assistant.",
  },
  {
    icon: <AiOutlineCheckCircle size={30} />,
    title: "Verify & Learn",
    desc: "Instantly check solutions and verify your progress with demo certificates.",
  },
  {
    icon: <AiOutlineLineChart size={30} />,
    title: "Track Progress",
    desc: "Monitor your learning journey with progress charts and insights.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-gray-900 text-white relative overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Follow these simple steps to learn, code, and grow with AI-powered guidance.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative p-6 rounded-2xl border-2 border-white/10 hover:border-blue-500 transition-all duration-500"
          >
            {/* Border Animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-blue-500 pointer-events-none"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            ></motion.div>

            <div className="relative z-10 flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-blue-500/20 rounded-full">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;