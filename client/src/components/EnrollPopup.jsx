import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const EnrollPopup = ({ isOpen, setIsOpen,onConfirm  }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          
          {/* Popup Box */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-[320px] text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl mb-4"
            >
              🎓
            </motion.div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-2">Enroll in this course?</h2>

            <p className="text-gray-500 text-sm mb-5">
              After enrollment you will get full access to lessons, videos and notes.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={()=>setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Enroll Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnrollPopup;