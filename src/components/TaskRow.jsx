// src/components/TaskRow.jsx
import React, { memo, useState } from "react";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../services/taskApi";
import { toast } from "react-toastify";
import { CustomToast } from "../common/CutomToast";

const TaskRow = ({ task, isMobile }) => {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTask({ id: task.id, status: newStatus }).unwrap();
      // toast.success("Task status updated successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update task status");
    }
  };
  const handleDelete = () => {
    CustomToast.delete({
      title: "Confirm Delete",
      message: `Are you sure you want to delete task "${task.name}"?`,
      async onConfirm() {
        try {
          await deleteTask(task.id).unwrap();
          // CustomToast.success("Task deleted successfully");
        } catch (error) {
          CustomToast.error(error.data?.message || "Failed to delete task");
        }
      },
      onCancel() {
        CustomToast.info("Delete cancelled");
      },
    });
  };
  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center w-[100%]">
          <span className=" text-sm font-medium w-[61%] md:text-lg">
            {task.name}
          </span>
          <StatusBadge status={task.status} />
        </div>
        <div className="text-sm text-gray-500">Created: {task.created_at}</div>
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
        {task.created_at}
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

export default memo(TaskRow);
