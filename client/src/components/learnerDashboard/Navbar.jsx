import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 rounded">

      <h2 className="text-sm md:text-xl font-bold">
        Learner Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span>🔔</span>

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />
      </div>

    </div>
  );
};

export default Navbar;