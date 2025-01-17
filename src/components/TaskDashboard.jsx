// src/components/TaskDashboard.jsx
import React, { useState, useEffect, memo } from "react";
import { toast } from "react-toastify";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import TaskStats from "./TaskStats";
import socketService from "../services/socketServices";
import { useGetTasksQuery } from "../services/taskApi";

const TaskDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tasks = [], isLoading, error, refetch } = useGetTasksQuery();
  console.log("task", tasks);
  useEffect(() => {
    const socket = socketService.connect();

    // Updated event listeners to handle messages
    socketService.onTaskAdded((data) => {
      console.log("Socket event - Task added:", data);
      toast.success(data?.message); // Show the realtime message
      refetch();
    });

    socketService.onTaskUpdated((data) => {
      console.log("Socket event - Task updated:", data);
      toast.info(data?.message); // Show the realtime message
      refetch();
    });

    socketService.onTaskDeleted((data) => {
      console.log("Socket event - Task deleted:", data);
      toast.info(data?.message); // Show the realtime message
      refetch();
    });

    return () => {
      socketService.disconnect();
    };
  }, [refetch]);
  // Error handling
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading tasks: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Task Management Dashboard
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg 
                     transition duration-200 ease-in-out transform hover:scale-105"
          >
            Add New Task
          </button>
        </div>

        {/* Statistics Section */}
        {tasks && tasks.length > 0 && <TaskStats tasks={tasks} />}

        {/* Tasks List Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : tasks && tasks.length > 0 ? (
          <TaskList tasks={tasks} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No tasks found. Add your first task!
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default memo(TaskDashboard);
