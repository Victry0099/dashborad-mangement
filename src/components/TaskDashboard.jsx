// src/components/TaskDashboard.jsx
import React, { useState } from "react";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import TaskStats from "./TaskStats";
import { useGetTasksQuery } from "../services/taskApi";

const TaskDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tasks = [], isLoading } = useGetTasksQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
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

        <TaskStats tasks={tasks} />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>

      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TaskDashboard;
