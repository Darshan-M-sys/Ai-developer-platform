import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBookOpen,
  FiUsers,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";
import { FaBarsProgress, FaCertificate } from "react-icons/fa6";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/instructor/dashboard", icon: <FiHome /> },
    { name: "My Courses", path: "/instructor/courses", icon: <FiBookOpen /> },
    { name: "Students", path: "/instructor/students", icon: <FiUsers /> },
    { name: "Students Progress", path: "/instructor/students/progress", icon: <FaBarsProgress /> },
    { name: "Certificates Issued", path: "/instructor/students/certificates", icon: <FaCertificate /> },
    { name: "Add Course", path: "/instructor/add-course", icon: <FiPlusCircle /> },
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-blue-600 text-white p-4">
        <h1 className="text-lg font-bold">Instructor Panel</h1>

        <button onClick={() => setOpen(!open)}>
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-black shadow-lg md:h-[calc(100vh-66px)] border-t-xl z-[30] h-screen fixed  top-15 left-0 w-64 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-300 flex flex-col justify-between`}
      >
        {/* Top Section */}
        <div>
          <div className="p-6 border-b ">
            <h1 className="text-2xl font-bold text-blue-600">Instructor</h1>
          </div>

          <ul className="p-4 space-y-4 flex flex-col   text-white ">
            {menu.map((item, index) => (
              <Link to={item.path} key={index}>
                <li
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-white/50"
                  }`}
                >
                  <span className="text-xl ">{item.icon}</span>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-[20] md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;