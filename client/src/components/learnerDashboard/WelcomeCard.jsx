import React from "react";

const WelcomeCard = ({ welcomeCourse, username }) => {

  return (
    <div onClick={()=>window.location.href=`/learner/course/${welcomeCourse?.enrollmentCourses?.courseId?._id || ''}/lesson/${welcomeCourse?.progressData?.currentLesson || ''}` } className="bg-blue-600 text-white p-6 rounded-xl">

      <h2 className="text-2xl font-bold">
        Welcome back, {username || "User"} 👋
      </h2>

      <p className="mt-2">
        Continue learning {welcomeCourse?.enrollmentCourses?.courseId?.title || "JavaScript"}
      </p>

      <div className="mt-4 bg-white h-3 rounded cursor-pointer">
        <div title={welcomeCourse?.progressData?.courseCompletion+"%"} style={{ width: `${welcomeCourse?.progressData?.courseCompletion || 0}%` }} className="bg-green-500 h-3 rounded"></div>
      </div>

    </div>
  );
};

export default WelcomeCard;