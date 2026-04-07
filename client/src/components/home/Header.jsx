import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ setProfileData }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const authData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
      setUser(res.data?.data || {});
      if (setProfileData) {
        setProfileData(res.data?.data || {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authData();
  }, []);

  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
      if (res.data.success) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-full fixed top-0 z-[40] backdrop-blur-md bg-white/20 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-500">
          DevForge
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden bg-black/30 p-3 px-10 rounded-3xl md:flex gap-8 text-sm font-medium text-white">
          <a href="#" className="hover:text-blue-400 transition">Home</a>
          <a href="/courses" className="hover:text-blue-400 transition">Courses</a>
          <a href="#" className="hover:text-blue-400 transition">Problems</a>
          <a href="#" className="hover:text-blue-400 transition">Playground</a>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
        </nav>

        {/* User / Auth Buttons */}
        {user.email ? (
          <div className="hidden md:flex justify-center items-center gap-2">
            <Link to="/profile">
              <img src={user.avatar} className="w-[40px] h-[40px] rounded-full" alt="profile" />
            </Link>
            <Link to="/profile">
              <p className="font-semibold md:block hidden text-white">{user.name}</p>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            <Link to="/login" className="px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-500 transition">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              Register
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile User Avatar */}
        {user.email && (
          <Link to="/profile">
            <img src={user.avatar} className="w-[40px] h-[40px] rounded-full md:hidden" alt="profile" />
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div  className="md:hidden  flex-1 transition-all duration-300 bg-black/70 backdrop-blur-md px-6 pb-6 flex flex-col gap-4 text-sm font-medium text-white rounded-b-lg">
          <a href="#" className="hover:text-blue-400 transition">Home</a>
          <a href="#" className="hover:text-blue-400 transition">Courses</a>
          <a href="#" className="hover:text-blue-400 transition">Problems</a>
          <a href="#" className="hover:text-blue-400 transition">Playground</a>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>

          {user.email ? (
            <div className="flex flex-col gap-2">
              <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border text-white border-red-500 rounded-lg hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/login" className="px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-500 transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
      <hr className="border-white/10" />
    </header>
  );
};

export default Header;