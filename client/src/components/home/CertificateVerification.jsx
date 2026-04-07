import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const CertificateVerification = () => {
  const [certId, setCertId] = useState("");
  const [status, setStatus] = useState(null);

  const handleVerify = () => {
    if (certId.trim().toLowerCase() === "devforge123") {
      setStatus("valid");
    } else {
      setStatus("invalid");
    }
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] top-10 left-10 rounded-full"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-500/20 blur-[100px] bottom-10 right-10 rounded-full"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Verify Your <span className="text-blue-400">Certificate</span>
          </h2>

          <p className="text-gray-400 mb-8">
            Instantly verify the authenticity of your DevForge certificates using our AI-powered system.
          </p>

          {/* INPUT BOX */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg">
            <input
              type="text"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder="Enter Certificate ID (try: devforge123)"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleVerify}
              className="w-full mt-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30"
            >
              Verify Certificate
            </button>

            {/* RESULT */}
            {status === "valid" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mt-4 text-green-400 font-semibold"
              >
                <AiOutlineCheckCircle size={22} />
                Valid Certificate ✔
              </motion.div>
            )}

            {status === "invalid" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mt-4 text-red-400 font-semibold"
              >
                <AiOutlineCloseCircle size={22} />
                Invalid Certificate ✖
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* RIGHT SIDE VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative w-[300px] h-[200px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl backdrop-blur-lg shadow-xl p-6">
            
            <h3 className="text-lg font-semibold mb-2">DevForge Certificate</h3>
            <p className="text-sm text-gray-300">Full Stack Developer</p>

            <div className="mt-6 text-xs text-gray-400">
              ID: DEVFORGE123
            </div>

            {/* Glow Badge */}
            <div className="absolute top-3 right-3 px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-400/30">
              Verified
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificateVerification;