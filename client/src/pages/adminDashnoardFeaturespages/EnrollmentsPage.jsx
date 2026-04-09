import React from 'react'
import Header from '../../components/home/Header'
import AdminSidebar from '../../components/AdminDashboard.jsx/AdminSidebar'
import { FaEdit } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { Delete } from 'lucide-react'
import { MdDelete } from 'react-icons/md'

const EnrollmentsPage = () => {
  const [enrollments,e]
  return (
    <>
    <Header/>
    <AdminSidebar/>
    <div className="mt-[55px] bg-white min-h-screen flex justify-center items-center  md:mt-[80px] bg-white md:ml-[250px]">
    <div className="w-full m-[20px]">  
      <table className="w-full  p-4 mr-[40px] bg-white shadow"> 
      <thead className="w-full ">
        <tr className="w-full text-center bg-gray-100 p-4 shadow">
          <td className="p-2">Avatar</td>
          <td className="p-2">Name</td>
          <td className="p-2">Course</td>
          <td className="p-2">Instructor</td>
          <td className="p-2">Actions</td>
        </tr>
      </thead>
      <tbody className="w-full text-center">
        <tr className="w-full text-center bg-white p-4 shadow ">
          <td className='p-2'> Tis</td>
          <td className='p-2'> Tis</td>
          <td className='p-2'> Tis</td>
          <td className='p-2'> Tis</td>
          <td className='p-2'> 
            <button className="text-2xl p-1  bg-red-300 rounded-full text-white hover:text-red-500 hover:bg-white"><MdDelete/></button>
          </td>
        </tr>
      </tbody>
      </table>

    </div>

    </div>
    </>
  )
}

export default EnrollmentsPage
