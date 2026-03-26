import React, { useEffect } from "react";

const ActionDisplay = ({ message, type = "success", onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();   // hide after 2 sec
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50">

      <div
        className={`px-6 py-3 rounded-lg shadow-lg text-white transition-all
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        {message}
      </div>

    </div>
  );
};

export default ActionDisplay;