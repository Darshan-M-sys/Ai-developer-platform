import React from "react";

const StudentsTable = () => {
  const students = [
    {
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      course: "React Course",
      date: "12 Mar 2025",
      status: "Active",
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    {
      name: "Sneha R",
      email: "sneha@gmail.com",
      course: "JavaScript Course",
      date: "15 Mar 2025",
      status: "Active",
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    {
      name: "Arjun",
      email: "arjun@gmail.com",
      course: "Python Course",
      date: "20 Mar 2025",
      status: "Pending",
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Enrolled Students</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3">Student</th>
              <th className="p-3">Email</th>
              <th className="p-3">Course</th>
              <th className="p-3">Enrolled Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {/* Student Name + Image */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={student.image}
                    alt="student"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold">{student.name}</p>
                </td>

                <td className="p-3 text-gray-600">{student.email}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">{student.date}</td>

                {/* Status Badge */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;