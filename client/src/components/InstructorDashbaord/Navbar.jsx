import React from "react";

const Navbar = () => {
  const instructor = {
    name: "Darshan",
    image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };

  return (
    <div className="bg-white hidden shadow px-6 py-4 md:flex justify-between items-center">
      
      {/* Welcome Text */}
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, <span className="text-blue-600">{instructor.name}</span>
      </h1>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <img
          src={instructor.image}
          alt="profile"
          className="w-10 h-10 rounded-full border"
        />

        <h2 className="font-semibold text-gray-700">
          {instructor.name}
        </h2>
      </div>

    </div>
  );
};

export default Navbar;