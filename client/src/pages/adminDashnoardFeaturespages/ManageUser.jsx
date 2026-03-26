import React, { useState } from "react";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard.jsx/AdminSidebar";
import axios from "axios";
import { useEffect } from "react";
import EditUsers from "../../components/AdminDashboard.jsx/EditUsers";
import ActionDisplay from "../../components/ActionDisplay";

const ManageUsers = () => {
  const [action,setAction]=useState({
    show:false,
    message:"",
    type:''
  })
 
  const [users,setUsers]=useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
   const [openEdit,setOpenEdit]=useState(false);
   const [userId,setUserId]=useState("")
  const getUsers=async()=>{
try {
  const res= await axios.get("http://localhost:5000/admin/users",{withCredentials:true});
  setUsers(res.data?.data || [])
 
} catch (error) {
  console.log(error.message)
}
  }
  useEffect(()=>{
getUsers();
  },[openEdit,action.show])
 
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      roleFilter === "all" ? true : user.role === roleFilter;

    return matchSearch && matchRole;
  });


  const deleteUser=async(id)=>{
    try {
      if(!window.confirm("Are you sure to delete this account permanently ")) return ;
      if(id){
     const res= await axios.delete(`http://localhost:5000/admin/user/${id}`,{withCredentials:true});
     if(res.data?.success){
      setOpenEdit(false);
      setAction({
        show:true,
        message:res.data?.message,
        type:"success"
      })
     }}
    } catch (error) {
     console.log(error.message) 
    }
  }
  return (
    <>
     {action.show && (
      <ActionDisplay
        message={action.message}
        type={action.type}
        onClose={() => setAction((prev) => ({ ...prev, show: false }))}
      />
    )}
    <Header/>
    <AdminSidebar/>
    {openEdit && (
      <EditUsers setOpenEdit={setOpenEdit} userId={userId} setAction={setAction}/>
    )}
 
    <div className="md:w-[83%] w-full bg-gray-100 min-h-screen md:ml-[280px] md:mt-[66px] mt-[55px] p-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-gray-500">Search, filter and manage platform users.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search users..."
          className="p-3 rounded-xl border w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded-xl border w-full md:w-1/4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length>0?filteredUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{user.name}</td>

                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm capitalize">
                    {user.role}
                  </span>
                </td>

                <td className="p-4 flex gap-3">
                  <button onClick={()=>(setOpenEdit(true),setUserId(user._id))}  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600">
                    Edit
                  </button>

                  <button onClick={()=>deleteUser(user._id )} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>

              </tr>
              
            )):<tr className="text-center text-xl p-2">
              <td>
 Result  Not found
</td>
</tr>}
          </tbody>

        </table>

      </div>

    </div>
    </>
  );
};

export default ManageUsers;