// src/components/TaskRow.jsx
import React, { useState } from "react";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../services/taskApi";
import { toast } from "react-toastify";

const TaskRow = ({ task, isMobile }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTask({ id: task.id, status: newStatus }).unwrap();
      toast.success("Task status updated successfully");
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task.id).unwrap();
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">{task.name}</span>
          <StatusBadge status={task.status} />
        </div>
        <div className="text-sm text-gray-500">
          Created: {new Date(task.created_at).toLocaleString()}
        </div>
        <div className="flex space-x-2">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="flex-1 rounded border-gray-300"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {task.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{task.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={task.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(task.created_at).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded border-gray-300"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default TaskRow;
