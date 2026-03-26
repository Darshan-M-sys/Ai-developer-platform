import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-between mx-[2px] md:mx-[10%] items-center">
     <div className="m">
        <h1 className=" text-lg md:text-3xl font-bold">Dashboard Overview</h1>
      </div>
      <div>
        <img  className="w-[50px] border h-[50px] rounded-full shadow " alt="admin profile" />
      </div>
    </div>
  )
}

export default Navbar
