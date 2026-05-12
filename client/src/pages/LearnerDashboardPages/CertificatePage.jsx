import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertificateTemplate from "./CertificateTemplate";
import MyCertificates from "../../components/learnerDashboard/MyCertificates";
import Header from "../../components/home/Header";
import Sidebar from "../../components/learnerDashboard/SideBar";

const CompletedCoursesCertificate = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const certificateRef = useRef();
 const [myCertificate,setMyCertificate]=useState([])
  const getCertificateData=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/student/certificates",{withCredentials:true});
      setMyCertificate(res.data?.data || [])
    } catch (error) {
     console.log(error.message) 
    }
  }
  useEffect(()=>{
getCertificateData();
  },[myCertificate])
  // 🔥 Get all completed courses
  useEffect(() => {
    const getCompletedCourses = async () => {
      const res = await axios.get(
        "http://localhost:5000/student/certificate/completed/courses",
        { withCredentials: true }
      );

      if (res.data.success) {
        setCompletedCourses(res.data.completedCourses);
      }
    };

    getCompletedCourses();
  }, [myCertificate]);

  // 🔥 Generate + Upload Certificate
  const handleGenerateCertificate = async (course) => {
    setSelectedCourse(course);

    setTimeout(async () => {
      try {
        // 1️⃣ Create image
        const canvas = await html2canvas(certificateRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // 2️⃣ Create PDF
        const pdf = new jsPDF("landscape", "px", [900, 650]);
        pdf.addImage(imgData, "PNG", 0, 0, 900, 650);

        // download for user
        pdf.save(`${course?.courseId?.title}-certificate.pdf`);

        // 3️⃣ Convert image → blob
        const imageBlob = await (await fetch(imgData)).blob();

        // 4️⃣ Convert PDF → blob
        const pdfBlob = pdf.output("blob");

        // 5️⃣ Send to backend
        const formData = new FormData();
        formData.append("certificatePdf", pdfBlob, "certificate.pdf");
        formData.append("certificateThumbnail", imageBlob, "certificate.png");

        await axios.post(
          `http://localhost:5000/student/certificate/generate/${course?.courseId?._id}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

       getCertificateData();
      } catch (error) {
        console.error(error);
        alert("Error generating certificate");
      }
    }, 500);
  };



  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="min-h-screen md:ml-[280px] md:mt-[66px] mt-[55px]   bg-white md:p-8">
       
     {completedCourses.length > 0 && ( 
      <><h1 className="text-3xl font-bold text-green-600 text-center">
        🎉 Congratulations! You completed these courses
      </h1>
      <div className="mt-8 grid gap-6 max-w-4xl mx-auto">
        {completedCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-600">
                {course?.courseId?.title}
              </h2>

              <p className="text-gray-600">
                Completed: {course?.courseCompletion}%
              </p>
            </div>

            <button
              onClick={() => handleGenerateCertificate(course)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Certificate
            </button>
          </div>
        ))}
      </div>
      </>
    )}
      {myCertificate.length === 0  && completedCourses.length === 0 && (
        <h1 className="text-3xl font-bold text-gray-600 text-center">
        You haven't completed any courses yet. Keep learning and come back for your certificates!
      </h1>
      )}
      {/* Course List */}
      

      {/* Hidden Certificate for Image + PDF */}
      {selectedCourse && (
        <div
          style={{ position: "absolute", left: "-9999px" }}
          ref={certificateRef}
        >
          <CertificateTemplate
            name={selectedCourse?.userId?.name}
            course={selectedCourse?.courseId?.title}
            date={new Date().toLocaleDateString()}
            institute="DevForge Academy"
            duration="3 Months"
            grade="Excellent"
          />
        </div>
      )}
      <MyCertificates myCertificate={myCertificate} />
    </div>
    </>
  );
};

export default CompletedCoursesCertificate;