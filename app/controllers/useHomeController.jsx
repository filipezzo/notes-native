import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

export function useHomeController() {
  const { data: tasks, isLoading } = useTasks();
  const [filterby, setFilterby] = useState("Para fazer");

  const handleChange = (filter) => setFilterby(filter);
  const filteredTasks = tasks?.filter((task) => task.step === filterby);

  return {
    tasks,
    isLoading,
    handleChange,
    filteredTasks,
    filterby,
  };
}
