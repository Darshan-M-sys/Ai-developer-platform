import React from "react";
import { TfiClose } from "react-icons/tfi";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy" },
  { id: 2, title: "Reverse String", difficulty: "Easy" },
  { id: 3, title: "Longest Substring", difficulty: "Medium" },
];

const Sidebar = ({setMenu}) => {
  return (
    <div className="p-4 space-y-3 relative">
      <div className='flex items-center justify-between'>
         <h2 className="font-bold text-lg">Problems</h2>
        <div onClick={()=>setMenu(false)} className="text-xl p-2 md:hidden bg-white shadow  rounded-full">
        <TfiClose/>
       </div>
      </div>
     
       

      {problems.map((p) => (
        <div
          key={p.id}
          className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
        >
          <h3 className="font-medium">{p.title}</h3>
          <p className="text-sm text-gray-500">{p.difficulty}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;