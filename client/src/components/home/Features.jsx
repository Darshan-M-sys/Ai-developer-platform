import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { FaBrain, FaBolt, FaCode, FaChartLine, FaUsers } from "react-icons/fa";
import { MdOutlineTrackChanges } from "react-icons/md";

const features = [
  {
    title: "AI-Powered Learning",
    desc: "Get personalized learning paths tailored to your skill level.",
    icon: <FaBrain />,
  },
  {
    title: "Real-time Feedback",
    desc: "Instant suggestions and corrections while you code.",
    icon: <FaBolt />,
  },
  {
    title: "Smart Code Assistant",
    desc: "AI helps you write, debug, and optimize code faster.",
    icon: <FaCode />,
  },
  {
    title: "Progress Tracking",
    desc: "Track your growth and stay motivated with insights.",
    icon: <FaChartLine />,
  },
  {
    title: "Interactive Practice",
    desc: "Hands-on exercises with live previews and challenges.",
    icon: <MdOutlineTrackChanges />,
  },
  {
    title: "Interactive Learning Lessons",
    desc: "Recorded Videos with AI text explanation",
    icon: <Video />,
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-20">

      {/* 🔥 Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold">
          Powerful Features 
        </h2>
        <p className="text-gray-400 mt-4">
          Everything you need to learn coding smarter with AI
        </p>
      </motion.div>

      {/* 💎 Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition"
          >

            {/* 🔥 ICON */}
            <div className="text-3xl mb-4 text-blue-400 group-hover:text-purple-400 transition">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm">
              {feature.desc}
            </p>

          </motion.div>
        ))}

      </div>

    </div>
  );
};

export default Features;