// src/components/skeletons/TaskDashboardSkeleton.jsx
import React, { memo } from "react";

const TaskDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header with Add New Task */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="h-7 w-48 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-9 w-32 bg-blue-200 rounded-md animate-pulse"></div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
          {/* Pending Tasks Card */}
          <div className="bg-yellow-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 w-28 bg-yellow-200 rounded mb-3"></div>
            <div className="h-8 w-8 bg-yellow-200 rounded"></div>
          </div>

          {/* In Progress Card */}
          <div className="bg-blue-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 w-28 bg-blue-200 rounded mb-3"></div>
            <div className="h-8 w-8 bg-blue-200 rounded"></div>
          </div>

          {/* Completed Card */}
          <div className="bg-green-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 w-28 bg-green-200 rounded mb-3"></div>
            <div className="h-8 w-8 bg-green-200 rounded"></div>
          </div>
        </div>

        {/* Task Table */}
        <div className="hidden md:block">
          <div className="px-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 w-16">
                    <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-3">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-3">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-3">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-3">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(7)].map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">
                      <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4">
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4">
                      <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                    </td>
                    <td className="py-4">
                      <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Task List */}
        <div className="md:hidden">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="p-4 border-b space-y-3 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-4 w-6 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-36 bg-gray-200 rounded"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-28 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Optional: Mobile Task Row Component if you want to separate the logic
const MobileTaskRowSkeleton = ({ index }) => (
  <div key={index} className="p-4 border-b space-y-3 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-4 w-6 bg-gray-200 rounded"></div>
      <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
    </div>
    <div className="h-4 w-48 bg-gray-200 rounded"></div>
    <div className="h-4 w-36 bg-gray-200 rounded"></div>
    <div className="flex space-x-2">
      <div className="h-8 w-28 bg-gray-200 rounded"></div>
      <div className="h-8 w-16 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default memo(TaskDashboardSkeleton);
