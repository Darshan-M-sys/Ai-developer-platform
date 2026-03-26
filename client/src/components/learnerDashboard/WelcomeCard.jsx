import React from "react";

const WelcomeCard = () => {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-xl">

      <h2 className="text-2xl font-bold">
        Welcome back, Darshan 👋
      </h2>

      <p className="mt-2">
        Continue learning JavaScript
      </p>

      <div className="mt-4 bg-white h-3 rounded">
        <div className="bg-green-500 h-3 w-3/4 rounded"></div>
      </div>

    </div>
  );
};

export default WelcomeCard;