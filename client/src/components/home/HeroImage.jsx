import { motion } from "framer-motion";
import heroImg from "../assets/hero.png";

const HeroImage = () => {
  return (
    <div className="relative flex justify-center items-center">

      {/* 🔥 BIG BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[120px] opacity-20 rounded-full"></div>

      {/* 🔥 Glow 1 */}
      <motion.div
        className="absolute w-72 h-72 md:w-96 md:h-96 bg-purple-500 blur-3xl opacity-30 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* 🌈 Glow 2 */}
      <motion.div
        className="absolute w-60 h-60 bg-blue-500 blur-2xl opacity-20 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* 🧠 OVERLAY (BLENDING FIX) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 rounded-2xl"></div>

      {/* 💻 IMAGE */}
      <motion.img
        src={heroImg}
        alt="AI Desktop"
        className="relative z-20 w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] rounded-2xl shadow-[0_0_80px_rgba(139,92,246,0.4)]"

        animate={{
          y: [0, -25, 0],
          rotate: [0, 1.5, -1.5, 0],
        }}

        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        whileHover={{
          scale: 1.05,
          rotate: 1,
        }}
      />
    </div>
  );
};

export default HeroImage;