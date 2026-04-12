import React from "react";
import { Link } from "react-router-dom";

const AiChat = () => {
  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="font-bold text-lg">
       Practice coding with AI
      </h3>

      <p className="text-gray-600">
       Explain Concepts in simple 
      </p>

  <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
        <Link to='/ai/chat'>
        DevForge AI
        </Link>
      </button>

    </div>

  );
};

export default AiChat;