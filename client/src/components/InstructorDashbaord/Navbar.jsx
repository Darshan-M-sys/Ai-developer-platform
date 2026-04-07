import React from "react";

const Navbar = ({profileData}) => {
 const handleRedirect=()=>{
  window.location.href="/profile"
 }
  return (
    <div className="bg-white hidden shadow px-6 py-4 md:flex justify-between items-center">
      
      {/* Welcome Text */}
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, <span className="text-blue-600">{profileData.name}</span>
      </h1>

      {/* Profile Section */}
      <div onClick={handleRedirect} className="flex items-center gap-3">
        <img
          src={profileData.avatar}
          alt="profile"
          className="w-10 h-10 rounded-full border"
        />

        <h2 className="font-semibold text-gray-700">
          {profileData.name}
        </h2>
      </div>

    </div>
  );
};

export default Navbar;