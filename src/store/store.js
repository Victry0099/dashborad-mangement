// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../services/taskApi";

const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export { store };
