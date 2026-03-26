import React from "react";

const activities = [
  { id: 1, text: "New student registered - Rahul K", time: "2 minutes ago" },
  { id: 2, text: "New course created - React for Beginners", time: "10 minutes ago" },
  { id: 3, text: "Instructor added - Amit S", time: "30 minutes ago" },
  { id: 4, text: "Student enrolled in Node.js course", time: "1 hour ago" },
  { id: 5, text: "New user registered - Priya R", time: "2 hours ago" },
];

const RecentActivity = () => {
  return (
    <div className="w-full p-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Recent Activity</h1>
        <p className="text-gray-500">Latest actions happening on the platform.</p>
      </div>

      {/* Activity List */}
      <div className="bg-white shadow-md rounded-2xl p-6">

        <div className="flex flex-col gap-4">

          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <p className="text-gray-700">{activity.text}</p>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default RecentActivity;