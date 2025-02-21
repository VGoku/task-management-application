import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTaskStatus: (id: string, status: Task['status']) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, task] 
      })),
      updateTask: (id, updatedTask) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        ),
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
      setTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, status } : task
        ),
      })),
    }),
    {
      name: 'task-storage',
    }
  )
);
