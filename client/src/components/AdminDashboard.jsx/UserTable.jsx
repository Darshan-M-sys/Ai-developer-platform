import React from "react";

const users = [
  { id: 1, name: "Darshan M", email: "darshan@gmail.com", role: "Admin" },
  { id: 2, name: "Rahul K", email: "rahul@gmail.com", role: "Student" },
  { id: 3, name: "Amit S", email: "amit@gmail.com", role: "Instructor" },
  { id: 4, name: "Priya R", email: "priya@gmail.com", role: "Student" },
];

const UsersTable = () => {
  return (
    <div className="w-full p-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-gray-500">View and manage all platform users.</p>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">

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
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{user.name}</td>

                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm">
                    {user.role}
                  </span>
                </td>

                <td className="p-4 flex gap-3">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default UsersTable;