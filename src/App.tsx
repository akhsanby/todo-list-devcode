import { Routes, Route } from "react-router-dom";

import ActivityList from "./components/ActivityList";
import ActivityItem from "./components/ActivityItem";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ActivityList />} />
      <Route path="/detail/:activityId" element={<TodoList />} />
    </Routes>
  );
}
