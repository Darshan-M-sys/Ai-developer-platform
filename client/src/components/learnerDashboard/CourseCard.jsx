import React from "react";

const CourseCard = ({enrolledCourses}) => {
  return (
<>
{enrolledCourses.map((item)=>{
return(
    <div key={item._id} className="bg-white p-5 rounded-xl shadow">

      <h3 className="font-bold text-lg">
       {item.enrollmentCourses?.courseId?.title}
      </h3>

      <p className="text-gray-500">
        Progress: 60%
      </p>

      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
        Continue
      </button>

    </div>)
    })}
</>
  );
};

export default CourseCard;