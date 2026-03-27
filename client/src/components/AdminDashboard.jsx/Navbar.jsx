import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({profileData}) => {

  return (
    <div className="flex justify-between mx-[2px] md:mx-[10%] items-center">
     <div className="m">
        <h1 className=" text-lg md:text-3xl font-bold">Dashboard Overview</h1>
      </div>
      <div>
      <Link to="/profile"> <img src={profileData.avatar}  className="w-[50px] border h-[50px] rounded-full shadow" alt="admin profile" /></Link>
      </div>
    </div>
  )
}

export default Navbar
