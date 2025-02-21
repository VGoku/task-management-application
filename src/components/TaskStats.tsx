import React from 'react';
import { Task } from '../types/task';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm font-medium text-gray-500">Total Tasks</h4>
        <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm font-medium text-gray-500">To Do</h4>
        <p className="text-2xl font-bold text-blue-600">{todoTasks}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm font-medium text-gray-500">In Progress</h4>
        <p className="text-2xl font-bold text-yellow-600">{inProgressTasks}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm font-medium text-gray-500">Completed</h4>
        <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
      </div>
    </div>
  );
};

export default TaskStats;
