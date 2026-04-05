import React from "react";

const StudentsTable = ({students}) => {

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
         
            {students?.map((student) => (
              <>
              {student?.map((item,index)=>(
              <tr key={index} className="border-b hover:bg-gray-50">
                {/* Student Name + Image */}
                
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.studentId?.avatar}
                    alt="student"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold">{item.studentId?.name}</p>
                </td>

                <td className="p-3 text-gray-600">{item.studentId?.email}</td>
                <td className="p-3">{item.courseId?.title}</td>
            <td className="p-3">
  {new Date(item.enrolledAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })}
</td>

                {/* Status Badge */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                     "Active" === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                 Active
                  </span>
                </td>
              </tr>
              ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;