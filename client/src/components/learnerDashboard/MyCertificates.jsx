import { Copy, CopyCheck } from "lucide-react";
import React, { useEffect, useState } from "react";

const MyCertificates = ({ myCertificate }) => {


  const [isCopy,setIsCopy]=useState(false);

  const handleCopyCertificateIs=(id)=>{
    setIsCopy(true)
    navigator.clipboard.writeText(id)
  }
  useEffect(()=>{
    if(isCopy){
    const time= setTimeout(()=>{
       setIsCopy(false)
    },3000)
    return()=>{
      clearTimeout(time)
    }
    }
  },[isCopy])
    if (!myCertificate || myCertificate.length === 0)return;
  return (
    <div className="min-h-screen bg-slate-300  rounded-xl md:p-8">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
        🏆 My Certificates
      </h1>
      <hr/>

<br/>      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myCertificate.map((cert) => (
          <div
            key={cert._id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition"
          >
            <div className="relative">
            {/* Certificate Image */}
            <img
              src={cert.certificateThumbnailUrl}
              alt="certificate"
              className="w-full h-48 object-cover rounded-lg border"
            />
 <div className="absolute w-full h-10 bg-white/60blur-[10px] top-0 rounded-t-xl"/>
 <div className="absolute w-10 h-48 bg-white/60 top-0 blur-[10px] left-0 rounded-r-xl"/>
 <div className="absolute w-10 h-48 bg-white/60 top-0 blur-[10px] right-0 rounded-l-xl"/>

 <div className="absolute w-full h-10 bg-white/60 blur-[10px] bottom-0 rounded-b-xl"/>
      </div>

            {/* Certificate Info */}
            <div className="mt-4">
              <p className="text-sm text-gray-500">Certificate ID</p>
              <div className="flex items-center justify-center gap-1 bg-gray-100 m-auto w-[60%] rounded-lg p-1">
              <p className="font-bold text-blue-600">{cert.certificateId} </p>
              <p onClick={()=>handleCopyCertificateIs(cert.certificateId)} className="text-[10px] text-gray-400 cursor-pointer hover:text-black">{isCopy?(<CopyCheck/>):(<Copy fontSize={2}/>)}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">Course Name</p>
              <p className="text-gray-700">{cert.courseId?.title}</p>

              <p className="text-sm text-gray-500 mt-2">Generated On</p>
              <p className="text-gray-700">
                {new Date(cert.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Download Button */}
            <a
              href={cert.certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="block mt-5 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Download Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;