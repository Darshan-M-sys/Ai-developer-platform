import React from "react";
import ReactMarkdown from "react-markdown";
import video from "../assets/video.mp4"
const lesson = {
  title: "Introduction to Python",
  courseTitle: "Python Basics",
  instructor: "John Doe",
  duration: "10 min",
  video: "/video/python-intro.mp4",
  description: `
## Introduction to Python

Python is one of the most popular programming languages in the world.

### In this lesson you will learn:
- What Python is
- Why Python is used
- Where Python is used

### Topics covered
1. Python overview
2. Python features
3. First Python program

> This lesson is for complete beginners.
`
};
const LessonView = () => {
  if (!lesson) return <div className="p-6">Select a lesson</div>;

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">

      {/* Title */}
     

      {/* Video Section */}
      <div className="bg-black rounded-xl overflow-hidden mb-8">
        <video
          controls
          className="w-full  h-full object-cover"
          src={video}
        />
      </div>
 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
          <p><span className="font-medium">Course:</span> {"Python Programming "}</p>
          <p><span className="font-medium">Instructor:</span> {"Darshan M"}</p>
          <p><span className="font-medium">Duration:</span> {"30.s"}</p>
        </div>
      {/* Description in Markdown */}
      <div className="bg-white rounded-xl shadow-sm md:p-6">
        

        <h2 className="text-xl font-semibold mb-4">Lesson Description</h2>

        <div className="prose max-w-none">
          <ReactMarkdown>
            {lesson.description}
          </ReactMarkdown>
        </div>

      </div>

    </div>
  );
};

export default LessonView;