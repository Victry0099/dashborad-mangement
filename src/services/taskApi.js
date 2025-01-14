import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use the environment variable or fallback to localhost
const server = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: server,
    credentials: "include", // Add credentials
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      // Add any additional headers if needed
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/tasks",
        credentials: "include",
      }),
      providesTags: ["Task"],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`, // Fixed template literal syntax
        method: "PUT",
        body: patch,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`, // Fixed template literal syntax
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
