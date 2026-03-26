import React, { useState } from "react";
import FormField from "../../components/FormField";
import Header from "../../components/home/Header";
import LessonSideBar from "../../components/AdminDashboard.jsx/LessonSideBar";
import { MdMenu } from "react-icons/md";


const AddLessonPage = () => {
  const[open,setOpen]=useState(false)
  const [formData, setFormData] = useState({
    title: "",
    courseTitle: "",
    instructor: "",
    duration: "",
    video: null,
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, video: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
    <Header/>
    <LessonSideBar lessons={[]} open={open} setOpen={setOpen}/>
    <div className=" md:mt-[66px] md:ml-[300px] mt-[60px] p-2 md:p-10 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl   font-semibold ">
        Add New Lesson
      </h1>
      <p onClick={()=>setOpen(!open)} className="p-2  md:hidden bg-white shadow-xl rounded-full"><MdMenu fontSize={28}/></p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-1 md:p-8 max-w-3xl">

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Lesson Title */}
          <FormField
            label="Lesson Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Course Title */}
          <FormField
            label="Sub Title"
            name=""
            value={formData.courseTitle}
            onChange={handleChange}
          />

      
          {/* Duration */}
          <FormField
            label="Lesson Duration (Example: 10 min)"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
          <FormField
            label="Percentage of Lesson (Example: 2%)"
            name="percentage"
            value={formData.duration}
            onChange={handleChange}
          />

          {/* Video Upload */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Upload Lesson Video</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          </div>

          {/* Description (Markdown) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Lesson Description (Markdown Supported)
            </label>
            <textarea
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none"
              placeholder="Write lesson description using markdown..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-2 items-center justify-start">
            <button className="bg-black w-[200px] text-white px-6 py-2 rounded-lg">
              Add Lesson
            </button>
            <button className="bg-black  w-[200px] text-white px-6 py-2 rounded-lg">
              cancel
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
  );
};

export default AddLessonPage;