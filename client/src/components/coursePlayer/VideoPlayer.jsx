import React, { useRef, useState } from "react";
import video from "../assets/video.mp4";

const VideoPlayer = ({ lessonName = "Introduction to React" }) => {

  const videoRef = useRef(null);

  const [totalVideoDuration, setTotalVideoDuration] = useState(0);
  const [runningTime, setRunningTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return `${h > 0 ? h + ":" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const percentage = () => {
    if (!totalVideoDuration) return 0;
    return (runningTime / totalVideoDuration) * 100;
  };

  const handleLoadedMetadata = () => {
    setTotalVideoDuration(videoRef.current.duration);
  };

  const handleCompleteLesson = () => {
    setCompleted(true);

    // Later you can send this to backend
    // axios.post("/api/lesson-complete",{lessonId,userId})
  };

  return (
    <div className="bg-white shadow-lg relative z-0  rounded-b-xl p-6 w-full space-y-4">
      {/* Lesson Name */}
      <h2 className="text-xl font-semibold text-gray-800">
        {lessonName}
      </h2>

      {/* Video */}
      <video
        ref={videoRef}
        src={video}
        controls
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={(e) => setRunningTime(e.target.currentTime)}
        className="w-full  relative rounded-lg"
      />

      {/* Time */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatTime(runningTime)}</span>
        <span>{formatTime(totalVideoDuration)}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all"
          style={{ width: `${percentage()}%` }}
        ></div>
      </div>

      {/* Progress Info */}
      <div className="flex justify-between items-center">

        <p className="text-sm text-gray-600">
          Lesson Progress: <span className="font-medium">{Math.floor(percentage())}%</span>
        </p>

        {/* Complete Button */}
        <button
          onClick={handleCompleteLesson}
          disabled={completed}
          className={`px-4 py-2 rounded-lg text-white md:text-sm text-[10px] 
          ${completed ? "bg-green-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {completed ? "Completed ✓" : "Mark as Complete"}
        </button>

      </div>

    </div>
  );
};

export default VideoPlayer;