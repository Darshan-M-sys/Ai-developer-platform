import React from "react";

const Navbar = () => {
  return (
    <div className="h-14 bg-gray-900 text-white w-[320px] md:w-full overflow-x-scroll flex items-center justify-between px-6">
      
      {/* Logo */}
      <h1 className="text-lg font-bold">DevCode</h1>

      {/* Actions */}
      <div className="flex items-center gap-4">
        
        <select className="bg-gray-800 px-2 py-1 rounded">
          <option>JavaScript</option>
          <option>Python</option>
        </select>

        <button className="bg-blue-600 px-3 py-1 rounded">
          Run
        </button>

        <button className="bg-green-600 px-3 py-1 rounded">
          Submit
        </button>

        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Navbar;