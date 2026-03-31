import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import certificateBridge from "../../../src/components/assets/certificate bridge.png";
import devForge from "../../../src/components/assets/devforge.png";

const CertificateTemplate = ({
  name = "John Doe",
  course = "Advanced React Development",
  date = "31 March 2026",
  institute = "Tech Academy",
  duration = "3 Months",
  grade = "Excellent",
}) => {

  const certificateRef = useRef();

  // 📄 Download PDF Function
  const downloadPDF = async () => {
    const element = certificateRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("l", "px", [900, 650]);

    pdf.addImage(imgData, "PNG", 0, 0, 900, 650);
    pdf.save(`${name}-certificate.pdf`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">

      {/* CERTIFICATE */}
      <div ref={certificateRef}>
        <div className=""
          style={{
            width: "900px",
            height: "650px",
            padding: "60px",
            border: "12px solid #2E86C1",
          
            textAlign: "center",
            fontFamily: "Georgia, serif",
            background: "#ffffff",
            position: "relative",
            boxShadow: "0 0 25px rgba(0,0,0,0.15)",
          }}
        >
          {/* TOP LOGOS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={devForge}
              alt="Institute Logo"
              style={{ width: "90px", height: "90px" }}
            />

            <img
              src={certificateBridge}
              alt="Institute Logo"
              style={{ width: "90px", height: "90px" }}
            />
          </div>

          {/* TITLE */}
          <h1
            style={{
              fontSize: "48px",
              margin: "10px 0",
              color: "#2E86C1",
              fontWeight: "bold",
            }}
          >
            Certificate of Achievement
          </h1>

          {/* SUBTITLE */}
          <p style={{ fontSize: "18px", margin: "10px 0", color: "#555" }}>
            This certificate is proudly presented to
          </p>

          {/* NAME */}
          <h2
            style={{
              fontSize: "38px",
              margin: "15px 0",
              color: "#1B4F72",
              fontWeight: "bold",
            }}
          >
            {name}
          </h2>

          {/* DATE BELOW NAME */}
          <p style={{ fontSize: "16px", color: "#555" }}>
            Date of Issue: <strong>{date}</strong>
          </p>

          {/* COURSE TEXT */}
          <p style={{ fontSize: "20px", margin: "10px 0", color: "#555" }}>
            For successfully completing the course
          </p>

          {/* COURSE NAME */}
          <h3
            style={{
              fontSize: "28px",
              margin: "10px 0",
              color: "#2874A6",
              fontWeight: "bold",
            }}
          >
            {course}
          </h3>

          {/* DESCRIPTION */}
          <p
            style={{
              fontSize: "13px",
              marginTop: "20px",
              color: "#555",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.6",
            }}
          >
            This certificate is awarded by <strong>{institute}</strong> in
            recognition of successfully completing the program. The course
            duration was <strong>{duration}</strong> and the participant has
            achieved a performance grade of <strong>{grade}</strong>.
          </p>

          {/* SIGNATURE SECTION */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              left: "0",
              padding: "0 60px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p>________________________</p>
              <p>Instructor</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <p>________________________</p>
              <p>Director</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CertificateTemplate;