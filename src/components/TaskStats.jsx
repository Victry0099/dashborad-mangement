// src/components/TaskStats.jsx
import React from "react";

const TaskStats = ({ tasks }) => {
  const stats = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard
        title="Pending Tasks"
        count={stats["Pending"] || 0}
        color="yellow"
      />
      <StatCard
        title="In Progress"
        count={stats["In Progress"] || 0}
        color="blue"
      />
      <StatCard
        title="Completed"
        count={stats["Completed"] || 0}
        color="green"
      />
    </div>
  );
};

const StatCard = ({ title, count, color }) => {
  const colors = {
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
  };

  return (
    <div className={`${colors[color]} rounded-lg p-6`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default TaskStats;
