// src/components/TaskList.jsx
import React, { memo, useState } from "react";
import TaskRow from "./TaskRow";
import { useMediaQuery } from "../hooks/useMediaQuery";

const TaskList = ({ tasks }) => {
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {sortedTasks.map((task) => (
          <div key={task.id} className="bg-gray-50 p-4 rounded-lg shadow">
            <TaskRow task={task} isMobile={true} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["ID", "Name", "Status", "Created At", "Actions"].map((header) => (
              <th
                key={header}
                onClick={() => handleSort(header.toLowerCase())}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                {header}
                {sortField === header.toLowerCase() && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(TaskList);
