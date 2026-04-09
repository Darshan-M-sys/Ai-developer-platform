import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Students", path: "/admin/students" },
    { name: "Instructors", path: "/admin/instructors" },
    { name: "Courses", path: "/admin/courses" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Enrollments", path: "/admin/enrollments" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-20 left-2 z-20">
        <button onClick={() => setOpen(true)}  className="text-black bg-white p-2 rounded-full shadow text-xl">
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0   z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-[55px] md:top-[66px] left-0 h-screen w-64 bg-gray-900 text-white p-6 z-20 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`p-3 rounded-lg transition duration-200
              ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Logout */}
          <Link
            to="/admin/logout"
            className="p-3 rounded-lg mt-6 bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </Link>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;