import React, { Suspense } from "react";

const TaskDashboard = React.lazy(() => import("./components/TaskDashboard"));
import TaskDashboardSkeleton from "./skeletons/TaskDashboardSkeleton";

function App() {
  return (
    <Suspense fallback={<TaskDashboardSkeleton />}>
      <TaskDashboard />
    </Suspense>
  );
}

export default App;
