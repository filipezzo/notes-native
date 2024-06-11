import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  selectedTask: null,

  setTasks: (tasks) => set(() => ({ tasks })),
  addTask: (task) =>
    set((state) => ({
      task: [...state.tasks, task],
    })),
  taskInfo: (id) =>
    set((state) => ({
      selectedTask: state.tasks.find((task) => task.id === id),
    })),
}));
