import React, { useEffect, useState } from 'react';
import Header from '../../components/home/Header';
import AdminSidebar from '../../components/AdminDashboard.jsx/AdminSidebar';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch enrollments
  const handleGetAllEnrollments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/admin/all/enrolled/students",
        { withCredentials: true }
      );
      console.log(res.data?.data)
      setEnrollments(res.data?.data || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllEnrollments();
  }, []);


  // ✅ Delete enrollment
  const handleDelete = async (id) => {
    if(!window.confirm("Are you  sure to delete this enrollment")) return;
    try {
    
      await axios.delete(
        `http://localhost:5000/admin/delete/${id}`,
        { withCredentials: true }
      );
      
      // update UI instantly
      setEnrollments((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <AdminSidebar />

      <div className="mt-[55px] min-h-screen flex justify-center md:mt-[80px] md:ml-[250px] bg-gray-50">
        <div className="w-full m-[20px]">

          <h2 className="text-2xl font-bold mb-4">Enrollments</h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded-lg overflow-hidden">

              {/* Table Head */}
              <thead>
                <tr className="text-center bg-gray-100">
                  <th className="p-3">Avatar</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Progress</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="text-center">

                {/* 🔄 Loading */}
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-4">
                      Loading... ⏳
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (

                  /* 😴 Empty State */
                  <tr>
                    <td colSpan="5" className="p-4 text-gray-500">
                      No enrollments found 😴
                    </td>
                  </tr>

                ) : (

                  /* ✅ Data Rendering */
                  enrollments.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">

                      {/* Avatar */}
                      <td className="p-3">
                        <img
                          src={item.userId?.avatar || "https://via.placeholder.com/40"}
                          alt="avatar"
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      </td>

                      {/* Name */}
                      <td className="p-3 font-medium">
                        {item.userId?.name || "N/A"}
                      </td>

                      {/* Course */}
                      <td className="p-3">
                        {item.courseId?.title || "N/A"}
                      </td>
                      <td className="p-3">
                        {item.courseCompletion + "%" || 0 +"%" }
                      </td>

                    

                      {/* Actions */}
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-xl p-2 bg-red-400 rounded-full text-white hover:bg-white hover:text-red-500 transition"
                        >
                          <MdDelete />
                        </button>
                      </td>

                    </tr>
                  ))

                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default EnrollmentsPage;