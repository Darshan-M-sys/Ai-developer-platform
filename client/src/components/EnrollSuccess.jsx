import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const EnrollSuccess = ({ isOpenSuccess, setIsOpenSuccess }) => {
  return (
    <AnimatePresence>
      {isOpenSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-[320px] text-center"
          >
            {/* Check Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.4 }}
              className="text-5xl mb-4"
            >
              ✅
            </motion.div>

            <h2 className="text-xl font-bold mb-2">Enrollment Successful!</h2>

            <p className="text-gray-500 text-sm mb-5">
              You can now start learning this course.
            </p>

            <Link to="/dashboard"
              onClick={()=>setIsOpenSuccess(false)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Course
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnrollSuccess;