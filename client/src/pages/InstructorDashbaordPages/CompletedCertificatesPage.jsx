import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaTrash, FaEye, FaDownload } from "react-icons/fa";
import Sidebar from "../../components/InstructorDashbaord/Sidebar";
import Header from "../../components/home/Header";

const CompletedCertificatesPage = () => {
  const [certificates, setCertificates] = useState([
    { id: 1, student: "Rahul", course: "React", date: "01 Apr" },
    { id: 2, student: "Sneha", course: "JavaScript", date: "01 Apr" },
    { id: 3, student: "Arjun", course: "Python", date: "02 Apr" },
    { id: 4, student: "Kiran", course: "HTML", date: "03 Apr" },
    { id: 5, student: "Meena", course: "CSS", date: "03 Apr" },
    { id: 6, student: "Vikas", course: "React", date: "04 Apr" },
  ]);

  // Convert certificates into graph data (date wise count)
  const chartData = certificates.reduce((acc, cert) => {
    const found = acc.find((item) => item.date === cert.date);

    if (found) {
      found.completed += 1;
    } else {
      acc.push({ date: cert.date, completed: 1 });
    }

    return acc;
  }, []);

  // Delete certificate
  const handleDelete = (id) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
  };

  return (
    <>
    <Header/>
    <div className=" md:mt-[66px] mt-[55px]">
      <Sidebar/>
    </div>
    <div className="p-6 md:ml-[250px] mt-[66px] mt-[55px] space-y-8">
      {/* Title */}
      <h1 className="text-3xl font-bold">Completed Certificates Issued</h1>

      {/* Graph */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Certificate Completion Rate (Date Wise)
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Date Issued</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-semibold">{cert.student}</td>
                <td className="p-4">{cert.course}</td>
                <td className="p-4">{cert.date}</td>

                <td className="p-4 flex justify-center gap-4">
                  <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
                    <FaEye />
                  </button>

                  <button className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
                    <FaDownload />
                  </button>

                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CompletedCertificatesPage;