// src/components/AddTaskModal.jsx
import React, { memo, useState } from "react";
import { useAddTaskMutation } from "../services/taskApi";
import { toast } from "react-toastify";

const AddTaskModal = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [addTask, { isLoading }] = useAddTaskMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({ name: taskName, status }).unwrap();
      // toast.success("Task added successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="mt-1 ps-3 py-1 block w-full rounded-md outline-none border-b-2 border-gray-300 shadow-sm focus:border-blue-200 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 ps-3 py-1 block w-full rounded-md outline-none border-b-2 border-gray-300 shadow-sm focus:border-blue-200 focus:ring-blue-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AddTaskModal);
