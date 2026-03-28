import { Link } from "react-router-dom";
import React from "react";

const Navbar = ({profileData}) => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 rounded">

      <h2 className="text-sm md:text-xl font-bold">
        Learner Dashboard
      </h2>

      <div className="flex items-center gap-4">
      <Link to="/profile">
      <img
          src={profileData.avatar}
          className="rounded-full w-[30px] h-[30px] md:w-[50px] md:h-[50px] "
          alt="profile"
        /></Link>
      </div>

    </div>
  );
};

export default Navbar;