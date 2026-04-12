import React, { useEffect, useState } from "react";
import axios from "axios";

const RoadmapSidebar = ({ setOnSelect, roadmaps, setIsOpen }) => {
 
  return (
    <div className="w-[250px] bg-gray-900 h-full fixed top-[66px] left-0 p-4 border-r border-gray-700">
      <h2 className="text-lg font-bold mb-4 text-white">
        📚 My Roadmaps
      </h2>
<div className="mb-4 ">
  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => setIsOpen(true)}>
    Create roadmap
  </button>
</div>
      <div className="space-y-2">
        {roadmaps.map((rm) => (
          <div
            key={rm._id}
              onClick={() => setOnSelect(rm)}
            className="p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 text-sm"
          >
            <p className="font-semibold text-blue-400">
              {rm.skill}
            </p>
            <p className="text-xs text-gray-400">
              {rm.level}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSidebar;